import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import Socket = SocketIOClient.Socket;
import { Player } from 'toxicgeartracker-shared';

@Injectable({
  providedIn: 'root'
})
export class GearService {

  private socket: Socket;

  constructor() {
    const backendURI = `${environment.backend.uri}:${environment.backend.port}`;
    this.socket = io(backendURI);
  }

  fetchPlayersGear(player: string, server: string): Observable<string> {
    console.log(`SOCKET SEND fetchPlayersGear`, { player, server });
    this.socket.emit('fetchPlayersGear', { player, server });
    return of('TODO: create websocket connection to backend wait for response.');
  }

  onFetchPlayerGear() {
    return new Observable(observer => {
      this.socket.on("fetchPlayersGear", (player: Player ) => {
        console.log(`SOCKET RECV fetchPlayersGear`, { player });
        // 1. Store this player in the localstorage database
        // TODO: Store player in localstorage database
        // 2.

        observer.next(player);
      });
    })
  }

}
