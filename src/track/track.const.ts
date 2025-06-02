import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsOptional()
  @ValidateIf((track) => track !== null)
  @IsUUID()
  artistId: string | null;
  @IsOptional()
  @ValidateIf((track) => track !== null)
  @IsUUID()
  albumId: string | null;
  @IsInt()
  duration: number;
}
