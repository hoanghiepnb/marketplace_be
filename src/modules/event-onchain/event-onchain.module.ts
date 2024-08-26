import { Module } from '@nestjs/common';
import { EventOnchainService } from './event-onchain.service';
import { BlockchainInfoModule } from "../blockchain-info/blockchain-info.module";
import { ItemsModule } from "../items/items.module";
import { NftModule } from "../nft/nft.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [BlockchainInfoModule, ItemsModule, NftModule, UsersModule],
  controllers: [],
  providers: [EventOnchainService],
  exports: [EventOnchainService],
})
export class EventOnchainModule {}
