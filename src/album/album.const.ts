import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsNotBlank } from 'src/common/validators/IsNotBlank.validator';

export class AlbumDto {
  @IsString()
  @MinLength(1)
  @IsNotBlank()
  name: string;
  @IsInt()
  @IsPositive()
  year: number;
  @IsOptional()
  @ValidateIf((album) => album.artistId !== null)
  @IsUUID('4', { message: 'Artist ID is not a valid UUID' })
  artistId: string | null;
}
