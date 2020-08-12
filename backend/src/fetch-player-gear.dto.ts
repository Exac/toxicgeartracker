import { IsString } from 'class-validator';

class FetchPlayerGearDto {
  @IsString()
  player: string;

  @IsString()
  server: string;
}
