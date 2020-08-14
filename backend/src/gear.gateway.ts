import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GearService } from './gear/gear.service';
import { IFetchPlayerGearDto, Player } from 'toxicgeartracker-shared';

@WebSocketGateway()
export class GearGateway {
  constructor(private readonly gear: GearService) {}

  @SubscribeMessage('fetchPlayersGear')
  onEvent(
    @MessageBody() data: IFetchPlayerGearDto,
  ): Observable<WsResponse<Player>> {
    return this.gear
      .getPlayer(data.player, data.server ?? 'Fairbanks')
      .pipe(map(player => ({ event: 'fetchPlayersGear', data: player })));
  }
}
