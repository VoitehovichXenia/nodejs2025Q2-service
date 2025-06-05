import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  PublicUser,
  SerializedUser,
  UpdateUserProps,
} from './user.const';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private _serialize(user: PublicUser): SerializedUser {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  public async getAll(): Promise<SerializedUser[]> {
    const users = await this.prisma.client.user.findMany({
      omit: { password: true },
    });
    return users.map((user) => this._serialize(user));
  }

  public async getById(id: string): Promise<SerializedUser | null> {
    const user = await this.prisma.client.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!user) return null;
    return this._serialize(user);
  }

  public async create(createUserDto: CreateUserDto): Promise<SerializedUser> {
    const createdAt = new Date();
    const newUser = await this.prisma.client.user.create({
      data: {
        ...createUserDto,
        version: 1,
        createdAt,
        updatedAt: createdAt,
      },
      omit: { password: true },
    });
    return this._serialize(newUser);
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
        omit: { password: true },
      });
      return true;
    } catch {
      return false;
    }
  }

  public async update({
    oldPassword,
    newPassword,
    id,
  }: UpdateUserProps): Promise<SerializedUser> {
    const user = await this.prisma.client.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} was not found`);
    if (user.password !== oldPassword)
      throw new ForbiddenException('User password is incorect');
    const updatedAt = new Date();
    const updatedVersion = user.version + 1;
    const updatedUser = await this.prisma.client.user.update({
      where: { id },
      data: {
        updatedAt,
        version: updatedVersion,
        password: newPassword,
      },
      omit: { password: true },
    });
    return this._serialize(updatedUser);
  }
}
