import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import {Web3} from 'web3';
import { environments } from "../../environments/environments";
import { BlockchainInfoService } from "../blockchain-info/blockchain-info.service";
import { ItemsService } from "../items/items.service";
import { UsersService } from "../users/users.service";
import { NftService } from "../nft/nft.service";

@Injectable()
export class EventOnchainService {
  private readonly logger = new Logger(EventOnchainService.name);
  private marketplaceContract: any;
  private web3: any;
  constructor(
    private readonly blockchainInfoService: BlockchainInfoService,
    private readonly itemsService: ItemsService,
    private readonly nftService: NftService,
    private readonly usersService: UsersService,
  ) {
    this.web3 = new Web3(environments.onchainData.web3Provider);
    this.marketplaceContract = new this.web3.eth.Contract(environments.onchainData.marketplaceABI,
      environments.onchainData.marketplaceContractAddress);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async listenListedEvents() {
    try {
      const eventName = 'Listed';
      const lastScanBlock = await this.blockchainInfoService.getLastScanBlock(environments.onchainData.blockchainName, eventName);
      const currentBlock = await this.web3.eth.getBlockNumber();
      this.logger.log('Scanning from block ' + (lastScanBlock + 1) + ' to block ' + currentBlock);

      const events = await this.marketplaceContract.getPastEvents(eventName, {
        fromBlock: lastScanBlock + 1,
        toBlock: currentBlock
      });

      await this._processListedEvent(events);

      await this.blockchainInfoService.updateBlockchainInfo(environments.onchainData.blockchainName, eventName, currentBlock);
    } catch (error) {
      this.logger.error(error);
    }
  }


  @Cron(CronExpression.EVERY_5_SECONDS)
  public async listenSoldEvents() {
    const eventName = 'Sold';
    const lastScanBlock = await this.blockchainInfoService.getLastScanBlock(environments.onchainData.blockchainName, eventName);
    const currentBlock = await this.web3.eth.getBlockNumber();
    this.marketplaceContract.getPastEvents(eventName, {
      fromBlock: lastScanBlock + 1,
      toBlock: currentBlock
    }, (error: any, events: any) => {
      if (error) {
        this.logger.error(error);
      }
      this._processSoldEvent(events);
    });
    await this.blockchainInfoService.updateBlockchainInfo(environments.onchainData.blockchainName, eventName, currentBlock);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async listenCancelledEvents() {
    const eventName = 'Cancelled';
    const lastScanBlock = await this.blockchainInfoService.getLastScanBlock(environments.onchainData.blockchainName, eventName);
    const currentBlock = await this.web3.eth.getBlockNumber();
    this.marketplaceContract.getPastEvents(eventName, {
      fromBlock: lastScanBlock + 1,
      toBlock: currentBlock
    }, (error: any, events: any) => {
      if (error) {
        this.logger.error(error);
      }
      this._processCancelledEvent(events);
    });
    await this.blockchainInfoService.updateBlockchainInfo(environments.onchainData.blockchainName,eventName, currentBlock);
  }

//   async function parseEvent(log) {
//   const eventAbi = auctionABI.find(e => e.name === 'AuctionCreated');
//   const decoded = web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1));
//   console.log(decoded.nftAddress, decoded.nftId, decoded.paymentToken, decoded.minPrice);
//   // console.log(decoded);
// }

//   export interface CreateItemDto {
//   userId: string;
//   nftId: string;
//   price: number;
// }

  private async _processListedEvent(event: any) {
    const eventAbi = environments.onchainData.marketplaceABI.find((e: any) => e.name === 'Listed');
    const nftAddress = environments.onchainData.nftAddress;
    this.logger.log('Processing ' + event.length + ' Listed events');
    for (let i = 0; i < event.length; i++) {
      const log = event[i];
      const decoded = this.web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1));
      const itemData = {
        userId: await this.usersService.findOrCreateUser(decoded.owner),
        nftId: await this.nftService.findOrCreateNft(nftAddress, decoded.tokenId),
        price: decoded.price,
      }
      await this.itemsService.createItem(itemData);
    }
  }

  private async _processSoldEvent(event: any) {
  }

  private async _processCancelledEvent(event: any) {
  }
}
