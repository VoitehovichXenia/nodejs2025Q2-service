import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, SerializedUser } from './user.const';
import { ContentTypeGuard } from 'src/common/guards/contentType.guard';
@Controller('user')
export class UserConroller {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<SerializedUser[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('User ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<SerializedUser> {
    const user = await this.userService.getById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} was not found`);
    return user;
  }

  @UseGuards(ContentTypeGuard)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SerializedUser> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('User ID is not valid UUID'),
      }),
    )
    id: string,
  ): Promise<void> {
    const isUserDeleted = await this.userService.delete(id);
    if (!isUserDeleted)
      throw new NotFoundException(`User with ID ${id} was not found`);
  }

  @UseGuards(ContentTypeGuard)
  @Put(':id')
  async updateUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('User ID is not valid UUID'),
      }),
    )
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<SerializedUser> {
    return await this.userService.update({ ...updatePasswordDto, id });
  }
}
