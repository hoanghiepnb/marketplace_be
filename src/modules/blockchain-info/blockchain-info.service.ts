import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BlockchainInfoEntity } from "./domain/blockchain-info.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BlockchainInfoService {
  constructor(
    @InjectRepository(BlockchainInfoEntity)
    private readonly blockchainInfoRepository: Repository<BlockchainInfoEntity>
  ) {
  }

  async getBlockchainInfo(name: string): Promise<BlockchainInfoEntity> {
    return this.blockchainInfoRepository.findOne( {where: {name}});
  }

  async updateBlockchainInfo(name: string, lastScanBlock: number): Promise<BlockchainInfoEntity> {
    const blockchainInfo = await this.getBlockchainInfo(name);
    blockchainInfo.lastScanBlock = lastScanBlock;
    return this.blockchainInfoRepository.save(blockchainInfo);
  }
}