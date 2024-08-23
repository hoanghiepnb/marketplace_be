import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './domain/users.entity';
import { isDefined } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async createUser(userAddress: string): Promise<void> {
    // check and save user
    const user = await this.userRepository.findOne({
      where: { address: userAddress },
    });
    if (!isDefined(user)) {
      await this.userRepository.save({
        address: userAddress,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
