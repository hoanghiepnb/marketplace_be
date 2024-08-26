import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IItem } from "./items.model";
import { ItemStatus } from "../enum/item-status.enum";

@Entity('items')
export class ItemsEntity extends BaseEntity implements IItem{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({name: 'user_id', nullable: false, type: 'uuid'})
  userId: string;
  @Column({name: 'nft_id', nullable: false, type: 'uuid'})
  nftId: string;
  @Column({nullable: false, type: 'numeric'})
  price: number;
  @Column({nullable: false, type: 'enum', enum: ItemStatus, default: ItemStatus.OPEN})
  status: ItemStatus;
  @Column({name: 'created_at', nullable: false, type: 'timestamp'})
  createdAt: Date;
  @Column({name: 'updated_at', nullable: false, type: 'timestamp'})
  updatedAt: Date;
}
