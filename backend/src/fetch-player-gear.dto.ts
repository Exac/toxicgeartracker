import { IsString } from 'class-validator/src/index';
import { IFetchPlayerGearDto } from 'toxicgeartracker-shared';

class FetchPlayerGearDto implements IFetchPlayerGearDto{
  @IsString()
  player: string;

  @IsString()
  server: string;
}
