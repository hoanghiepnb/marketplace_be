import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsEntity } from "./domain/items.entity";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsEntity])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})

export class ItemsModule {}