import { IsString } from 'class-validator';
import { IFetchPlayerGearDto } from 'toxicgeartracker-shared';

class FetchPlayerGearDto implements IFetchPlayerGearDto{
  @IsString()
  player: string;

  @IsString()
  server: string;
}
