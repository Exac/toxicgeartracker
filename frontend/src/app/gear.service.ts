import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root'
})
export class GearService {

  private socket: Socket;

  constructor(private http: HttpClient) {
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
      this.socket.on('fetchPlayersGear', (msg: string) => {
        console.log(`SOCKET RECV fetchPlayersGear`, { msg });
        observer.next(msg);
      })
    })
  }

}
