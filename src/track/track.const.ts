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
  @IsNotBlank()
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
  @IsPositive()
  duration: number;
}
