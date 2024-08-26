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

  public async createNft(nftData: CreateNftDto): Promise<void> {
    const nft = await this.nftRepository.findOne({
      where: { nftId: nftData.nftId },
    });
    if (!isDefined(nft)) {
      await this.nftRepository.save({
        ...nftData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  public async getNftsByOwner(owner: string): Promise<NftEntity[]> {
    return this.nftRepository.find({
      where: { owner },
    });
  }

  public async getAllNfts(): Promise<NftEntity[]> {
    return this.nftRepository.find();
  }

  public async updateOwner(nftId: number, owner: string): Promise<void> {
    await this.nftRepository.update({ nftId }, { owner });
  }
}