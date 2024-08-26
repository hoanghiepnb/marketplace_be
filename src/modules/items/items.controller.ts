import { ItemsService } from "./items.service";
import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { ItemsEntity } from "./domain/items.entity";

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
  ) {
  }

  @Get('/open-items')
  public async getOpenItems(): Promise<ItemsEntity[]> {
    return this.itemsService.getOpenItems();
  }

  @Get('/sold-items')
  public async getSoldItems(): Promise<ItemsEntity[]> {
    return this.itemsService.getSoldItems();
  }

  @Get('/all-items')
  public async getAllItems(): Promise<ItemsEntity[]> {
    return this.itemsService.getAllItems();
  }

  @Get('/items-by-user/:userId')
  public async getItemsByUserId(@Param("userId") userId: string): Promise<ItemsEntity[]> {
    return this.itemsService.getItemsByUserId(userId);
  }

  @Get('/:itemId')
  public async getItemById(@Param("itemId") itemId: string): Promise<ItemsEntity> {
    return this.itemsService.getItemById(itemId);
  }
}