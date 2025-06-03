import { Injectable } from '@nestjs/common';
import { User, CreateUserDto, PublicUser, UpdateUserProps } from './user.const';
import { generateUUID } from 'src/common/utils/generateUUID';

@Injectable()
export class UserService {
  private _users: User[] = [];

  public getPublicInfo(user: User): PublicUser {
    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  public getAll(): User[] {
    return this._users;
  }

  public getById(id: string): User | null {
    return this._users.find((user) => user.id === id);
  }

  public create(createUserDto: CreateUserDto): User {
    const createdAt = Date.now();
    const id = generateUUID(this._users);
    const newUser: User = {
      ...createUserDto,
      id,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };
    this._users.push(newUser);
    return newUser;
  }

  public delete(id: string): boolean {
    const user = this.getById(id);
    if (!user) return false;
    this._users = this._users.filter((user) => user.id !== id);
    return true;
  }

  public update({ newPassword, id }: UpdateUserProps): User | null {
    const user = this.getById(id);
    if (!user) return null;
    const userIndex = this._users.findIndex((user) => user.id === id);
    const updatedAt = Date.now();
    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt,
    };
    this._users[userIndex] = updatedUser;
    return updatedUser;
  }
}
