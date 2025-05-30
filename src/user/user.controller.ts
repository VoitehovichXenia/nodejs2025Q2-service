import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Delete,
  BadRequestException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, PublicUser, UpdatePasswordDto } from './user.const';

@Controller('user')
export class UserConroller {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): PublicUser[] {
    const processedUsers = this.userService
      .getAll()
      .map((user) => this.userService.getPublicInfo(user));
    return processedUsers;
  }

  @Get(':id')
  getUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User ID is not valid'),
      }),
    )
    id: string,
  ): PublicUser {
    const user = this.userService.getById(id);
    if (!user)
      throw new HttpException(
        `User with ID ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    const publicUserInfo = this.userService.getPublicInfo(user);
    return publicUserInfo;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    const publicUserInfo = this.userService.getPublicInfo(newUser);
    return publicUserInfo;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User ID is not valid'),
      }),
    )
    id: string,
  ): void {
    const isUserDeleted = this.userService.delete(id);
    if (!isUserDeleted)
      throw new HttpException(
        `User with ID ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Put(':id')
  updateUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User ID is not valid'),
      }),
    )
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.userService.getById(id);
    if (!user)
      throw new HttpException(
        `User with ID ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    if (oldPassword === newPassword)
      throw new HttpException(
        "New password can't be the same as old one",
        HttpStatus.BAD_REQUEST,
      );
    if (user.password !== oldPassword)
      throw new HttpException(
        `User password is incorect`,
        HttpStatus.FORBIDDEN,
      );
    if (newPassword?.trim().length < 6)
      throw new HttpException(
        `Password should have at least 6 characters`,
        HttpStatus.BAD_REQUEST,
      );
    const updatedUser = this.userService.update({ ...updatePasswordDto, id });
    const publicUserInfo = this.userService.getPublicInfo(updatedUser);
    return publicUserInfo;
  }
}
