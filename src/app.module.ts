import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EventOnchainModule } from './modules/event-onchain/event-onchain.module';
import { ItemsModule } from "./modules/items/items.module";
import { NftModule } from "./modules/nft/nft.module";
import { NftSaleHistoryModule } from "./modules/nft-sale-history/nft-sale-history.module";
import { BlockchainInfoModule } from "./modules/blockchain-info/blockchain-info.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      schema: 'marketplace',
      entities: [__dirname + '/modules/**/domain/*.entity{.ts,.js}'],
    }),
    UsersModule,
    ScheduleModule.forRoot(),
    EventOnchainModule,
    ItemsModule,
    NftModule,
    NftSaleHistoryModule,
    BlockchainInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
