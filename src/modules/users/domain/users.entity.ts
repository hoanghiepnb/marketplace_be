import { IUser } from './users.model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid' )
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true, name: 'address' })
  address: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
