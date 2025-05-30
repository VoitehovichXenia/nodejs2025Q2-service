import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnUser } from './user.const';

@Controller('user')
export class UserConroller {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): ReturnUser[] {
    const processedUsers = this.userService
      .getAll()
      .map((user) => this.userService.getPublicInfo(user));
    return processedUsers;
  }

  @Get(':id')
  getUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ReturnUser {
    const user = this.userService.getById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const publicUserInfo = this.userService.getPublicInfo(user);
    return publicUserInfo;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    const publicUserInfo = this.userService.getPublicInfo(newUser);
    return publicUserInfo;
  }
}
