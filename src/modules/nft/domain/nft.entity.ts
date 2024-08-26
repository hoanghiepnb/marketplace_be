import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { INft } from "./nft.model";

@Entity('nft')
export class NftEntity extends BaseEntity implements INft {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({nullable: false, type: 'varchar'})
  address: string;
  @Column({name: 'nft_id', nullable: false, type: 'integer'})
  nftId: number;
  @Column({nullable: false, type: 'varchar'})
  owner: string;
  @Column({name: 'created_at', nullable: false, type: 'timestamp'})
  createdAt: Date;
  @Column({name: 'updated_at', nullable: false, type: 'timestamp'})
  updatedAt: Date;
}