import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IBlockchainInfoModel } from "./blokchain-info.model";

export class BlockchainInfoEntity extends BaseEntity implements IBlockchainInfoModel{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: false, type: 'integer', name: 'last_scan_block'})
  lastScanBlock: number;
  @Column({nullable: false, type: 'varchar'})
  name: string;
  @Column({name: 'created_at', nullable: false, type: 'timestamp'})
  createdAt: Date;
  @Column({name: 'updated_at', nullable: false, type: 'timestamp'})
  updatedAt: Date;
}