import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User, CreateUserDto } from './user.const';

@Injectable()
export class UserService {
  private _users: User[] = [];

  public getAll() {
    return this._users;
  }

  public getById(id: string) {
    return this._users.find((user) => user.id === id);
  }

  public create({ login, password }: CreateUserDto): void {
    const createdAt = Date.now();
    const newUser: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };
    this._users.push(newUser);
    return;
  }
}
