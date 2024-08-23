import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventOnchainService {

  @Cron(CronExpression.EVERY_5_SECONDS)
  async listenOnchainEvents() {
    console.log('Listening to onchain events');


  }
}
