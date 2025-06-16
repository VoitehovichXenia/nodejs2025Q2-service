import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SerializedUser } from 'src/user/user.const';
import { UserService } from 'src/user/user.service';
import { TokenData } from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private async _generateJWT(user: SerializedUser): Promise<TokenData> {
    const jwtPayload = { sub: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
    };
  }

  public async login(loginUserDto: CreateUserDto): Promise<TokenData> {
    const user = await this.userService.getByLogin(loginUserDto);
    if (user) return await this._generateJWT(user);
  }
}
