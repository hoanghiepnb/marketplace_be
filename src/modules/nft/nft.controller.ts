import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NftService } from "./nft.service";
import { NftEntity } from "./domain/nft.entity";
import { CreateNftDto } from "./dto/create-nft.dto";

@Controller('nft')
@ApiTags('nft')
export class NftController {
  constructor(
    private readonly nftService: NftService,
  ) {
  }

  @Get('/:nftId')
  public async getNftById(@Param("nftId") nftId: number): Promise<NftEntity> {
    return this.nftService.getNftById(nftId);
  }

  @Get('/nfts-by-owner/:owner')
  public async getNftsByOwner(@Param("owner") owner: string): Promise<NftEntity[]> {
    return this.nftService.getNftsByOwner(owner);
  }

  @Get('/all-nfts')
  public async getAllNfts(): Promise<NftEntity[]> {
    return this.nftService.getAllNfts();
  }

  @Post('/create-nft')
  public async createNft(@Body() nftData: CreateNftDto): Promise<void> {
    return this.nftService.createNft(nftData);
  }

  @Put('/update-owner/:nftId')
  public async updateOwner(@Param("nftId") nftId: number, @Body() owner: string): Promise<void> {
    return this.nftService.updateOwner(nftId, owner);
  }
}