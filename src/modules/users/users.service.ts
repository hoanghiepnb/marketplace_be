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

  public async findOrCreateUser(userAddress: string): Promise<string> {
    // check and save user
    const user = await this.userRepository.findOne({
      where: { address: userAddress },
    });
    if (!isDefined(user)) {
      const newUser = await this.userRepository.save({
        address: userAddress,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newUser.id;
    }
    return user.id;
  }

  public async getUserByAddress(userAddress: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { address: userAddress },
    });
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
