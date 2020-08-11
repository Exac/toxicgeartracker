import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GearService } from './gear/gear.service';

@WebSocketGateway()
export class GearGateway {
  constructor(private readonly gear: GearService) {}

  @SubscribeMessage('fetchPlayersGear')
  onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
    const event = 'fetchPlayersGear';
    const response = [1, 2, 3];

    return from(response).pipe(map(data => ({ event, data })));
  }
}
