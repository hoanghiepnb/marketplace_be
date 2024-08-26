import { NftService } from "./nft.service";
import { NftController } from "./nft.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NftEntity } from "./domain/nft.entity";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([NftEntity])],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}