import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SerializedUser } from 'src/user/user.const';
import { UserService } from 'src/user/user.service';
import {
  ACCESS_TOKEN_EXPIRE,
  LoginDto,
  REFRESH_TOKEN_EXPIRE,
  RefreshDto,
  TokenData,
} from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private async _generateJWTToken(
    user: SerializedUser,
    type: 'access' | 'refresh',
  ): Promise<string> {
    const jwtPayload = { userId: user.id, login: user.login };
    return await this.jwtService.signAsync(jwtPayload, {
      expiresIn:
        type === 'access'
          ? process.env.TOKEN_EXPIRE_TIME || ACCESS_TOKEN_EXPIRE
          : process.env.TOKEN_REFRESH_EXPIRE_TIME || REFRESH_TOKEN_EXPIRE,
    });
  }

  public async login(loginUserDto: LoginDto): Promise<TokenData | null> {
    const user = await this.userService.getByLogin(loginUserDto);
    if (!user) return null;
    return {
      accessToken: await this._generateJWTToken(user, 'access'),
      refreshToken: await this._generateJWTToken(user, 'refresh'),
    };
  }

  public async refresh({
    refreshToken,
  }: RefreshDto): Promise<TokenData | null> {
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch {
      throw new ForbiddenException('Refresh token is invalid');
    }
    const user = await this.userService.getById(payload.userId);
    if (!user) return null;
    return {
      accessToken: await this._generateJWTToken(user, 'access'),
      refreshToken: await this._generateJWTToken(user, 'refresh'),
    };
  }
}
