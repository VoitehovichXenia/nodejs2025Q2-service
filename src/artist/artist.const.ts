import { IsBoolean, IsString, MinLength } from 'class-validator';
import { IsNotBlank } from 'src/common/validators/IsNotBlank.validator';

export class ArtistDto {
  @IsString()
  @MinLength(2)
  @IsNotBlank()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
