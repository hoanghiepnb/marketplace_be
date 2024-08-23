import { Module } from '@nestjs/common';
import { EventOnchainService } from './event-onchain.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EventOnchainService],
  exports: [EventOnchainService],
})
export class EventOnchainModule {}
