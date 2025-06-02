import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsInt()
  @IsPositive()
  year: number;
  @IsOptional()
  @ValidateIf((album) => album.artistId !== null)
  @IsUUID('4', { message: 'Artist ID is not a valid UUID' })
  artistId: string | null;
}
