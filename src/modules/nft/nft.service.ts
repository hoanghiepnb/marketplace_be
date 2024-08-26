import { Injectable } from "@nestjs/common";
import { NftEntity } from "./domain/nft.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { isDefined } from "class-validator";
import { CreateNftDto } from "./dto/create-nft.dto";

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NftEntity)
    private readonly nftRepository: Repository<NftEntity>,
  ) {
  }

  public async getNftById(nftId: number): Promise<NftEntity> {
    return this.nftRepository.findOne({
      where: { nftId: nftId },
    });
  }

  public async findOrCreateNft(nftAddress: string, nftId: number): Promise<string> {
    const nft = await this.nftRepository.findOne({
      where: {
        address: nftAddress,
        nftId,
      },
    });
    if (!isDefined(nft)) {
      const newNft = await this.nftRepository.save({
        address: nftAddress,
        nftId,
        owner: '0x0000000000000000000000000000000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newNft.id;
    }
    return nft.id;
  }

  public async getNftsByOwner(owner: string): Promise<NftEntity[]> {
    return this.nftRepository.find({
      where: { owner },
    });
  }

  public async getAllNfts(): Promise<any> {
    return this.nftRepository.find();
  }

  public async updateOwner(nftId: number, owner: string): Promise<void> {
    await this.nftRepository.update({ nftId }, { owner });
  }
}