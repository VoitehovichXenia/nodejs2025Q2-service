import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { IsNotBlank } from 'src/common/validators/IsNotBlank.validator';
import { User } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;
  @IsString()
  @IsNotBlank()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  newPassword: string;
}

export type PublicUser = Omit<User, 'password'>;

export type SerializedUser = Omit<PublicUser, 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
};

export type UpdateUserProps = UpdatePasswordDto & Pick<User, 'id'>;
