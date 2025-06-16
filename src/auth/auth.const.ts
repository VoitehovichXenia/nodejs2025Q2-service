export const DEFAULT_JWT_KEY = 'default-secret-key';

export type TokenData = {
  accessToken: string;
  refreshToken?: string;
};
