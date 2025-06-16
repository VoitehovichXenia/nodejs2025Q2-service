import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SerializedUser } from 'src/user/user.const';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private _generateJWT(user: SerializedUser) {
    const jwtPayload = { sub: user.id, login: user.login };
    return this.jwtService.signAsync(jwtPayload);
  }

  public async login(loginUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.getByLogin(loginUserDto);
    if (user) return this._generateJWT(user);
  }
}
