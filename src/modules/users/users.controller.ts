import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/address/:address')
  async getUserByAddress(@Param('address') address: string) {
    return this.usersService.getUserByAddress(address);
  }
}
