import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import * as io from "socket.io-client";
import { environment } from "../environments/environment";
import Socket = SocketIOClient.Socket;
import { Player } from "toxicgeartracker-shared";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root"
})
export class GearService {
  private socket: Socket;

  constructor(private db: DatabaseService) {
    const backendURI = `${environment.backend.uri}:${environment.backend.port}`;
    this.socket = io(backendURI);
  }

  fetchPlayersGear(player: string, server: string): Player | null {
    // See if player is stored locally
    const dbPlayer = this.db.getPlayer(player, server);
    if (dbPlayer !== null) {
      console.log(`${dbPlayer.name} is already in the database.`);
      return dbPlayer;
    }
    console.log(`SOCKET SEND fetchPlayersGear`, { player, server });
    this.socket.emit("fetchPlayersGear", { player, server });
    return null;
  }

  onFetchPlayerGear() {
    return new Observable(observer => {
      this.socket.on("fetchPlayersGear", (player: Player) => {
        console.log(`SOCKET RECV fetchPlayersGear`, { player });
        this.db.setPlayer(player);
        observer.next(player);
      });
    });
  }
}
