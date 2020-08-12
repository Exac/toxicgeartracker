import { IsString } from 'class-validator/src/index';
import { IFetchPlayerGearDto } from 'toxicgeartracker-shared/src/models';

class FetchPlayerGearDto implements IFetchPlayerGearDto{
  @IsString()
  player: string;

  @IsString()
  server: string;
}
