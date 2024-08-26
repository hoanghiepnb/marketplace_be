import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemsEntity } from "./domain/items.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemStatus } from "./enum/item-status.enum";

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  constructor(
    @InjectRepository(ItemsEntity)
    private readonly itemRepository: Repository<ItemsEntity>,
  ) {
  }

  public async createItem(itemData: CreateItemDto): Promise<void> {
    await this.itemRepository.save({
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public async getItemById(itemId: string): Promise<ItemsEntity> {
    return this.itemRepository.findOne({
      where: { id: itemId },
    });
  }

  public async getOpenItems(): Promise<ItemsEntity[]> {
    return this.itemRepository.find({
      where: { status: 'OPEN' as unknown as ItemStatus },
    });
  }


  public async getSoldItems(): Promise<ItemsEntity[]> {
    return this.itemRepository.find({
      where: { status: ItemStatus.SOLD },
    });
  }

  public async getItemsByUserId(userId: string): Promise<ItemsEntity[]> {
    return this.itemRepository.find({
      where: { userId },
    });
  }

  public async getAllItems(): Promise<ItemsEntity[]> {
    return this.itemRepository.find();
  }
}