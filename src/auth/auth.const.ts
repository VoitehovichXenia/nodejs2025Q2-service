import { CreateUserDto } from 'src/user/user.const';

export const ACCESS_TOKEN_EXPIRE = '1h';
export const REFRESH_TOKEN_EXPIRE = '7d';

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type LoginDto = CreateUserDto;

export type RefreshDto = Pick<TokenData, 'refreshToken'>;
