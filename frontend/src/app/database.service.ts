import { Injectable } from "@angular/core";
import {
  Equips as EquipsType,
  Player as PlayerType,
  Item as ItemType
} from "toxicgeartracker-shared";

class Item implements ItemType {
  constructor(public name: string = "", public id: number = 0) {}
}

class Equips implements EquipsType {
  constructor(
    public head: Item[] = [],
    public neck: Item[] = [],
    public shoulder: Item[] = [],
    public chest: Item[] = [],
    public back: Item[] = [],
    public shirt: Item[] = [],
    public tabard: Item[] = [],
    public wrist: Item[] = [],
    public hands: Item[] = [],
    public waist: Item[] = [],
    public legs: Item[] = [],
    public feet: Item[] = [],
    public finger: Item[] = [],
    public trinket: Item[] = [],
    public mainHand: Item[] = [],
    public twoHand: Item[] = [],
    public ranged: Item[] = []
  ) {}
}

class Player implements PlayerType {
  public name: string = "";
  public server: string = "";
  public spec:
    | "Druid"
    | "Hunter"
    | "Mage"
    | "Paladin"
    | "Priest"
    | "Rogue"
    | "Shaman"
    | "Warlock"
    | "Warrior" = "Shaman";
  public updated: string = "2004-11-23";
  public gear: Equips = new Equips();
  public wearing: Equips = new Equips();

  constructor(player?: PlayerType) {
    if (player !== undefined) {
      this.name = player.name;
      this.server = player.server;
      this.spec = player.spec;
      this.updated = player.updated;
      this.gear = player.gear;
      this.wearing = player.wearing;
    }
  }
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor() {}

  getPlayer(name: string, server?: string): PlayerType | null {
    const players = this.getAllPlayers();
    for (const [n, p] of players.entries()) {
      if (
        p.name.toLowerCase() === name.toLowerCase() &&
        (server === undefined ||
          server.toLowerCase() === p.server.toLowerCase())
      ) {
        return p;
      }
    }
    return null;
  }

  getAllPlayers(): Map<string, PlayerType> {
    const dbPlayersStr: string | null = localStorage.getItem("players");
    let dbPlayersEntries: [] | undefined;
    try {
      dbPlayersEntries = dbPlayersStr !== null ? JSON.parse(dbPlayersStr) : [];
      if (dbPlayersEntries === undefined) {
        return new Map();
      }
    } catch (e) {
      return new Map();
    }
    const dbPlayersMap = new Map(dbPlayersEntries);
    if (DatabaseService.isPlayersMap(dbPlayersMap)) {
      return dbPlayersMap;
    } else {
      return new Map();
    }
  }

  updateAllPlayers(players: Map<string, PlayerType>) {
    const entries = [...players];
    const str = JSON.stringify(entries);
    localStorage.setItem("players", str);
  }

  setPlayer(player: PlayerType) {
    const players = this.getAllPlayers();
    players.set(player.name, player);
    this.updateAllPlayers(players);
  }

  clear() {
    localStorage.clear();
  }

  private static isPlayer(player: any): player is PlayerType {
    if (
      !player.name ||
      typeof player.name !== "string" ||
      !player.server ||
      typeof player.server !== "string" ||
      !player.spec ||
      typeof player.spec !== "string" ||
      !player.updated ||
      typeof player.updated !== "string" ||
      !player.gear ||
      typeof player.gear !== "object" ||
      !player.wearing ||
      typeof player.wearing !== "object"
    ) {
      return false;
    }
    return !(player?.gear?.head?.id && typeof player.gear.head.id !== "number");
  }

  /** Validate player maps */
  static isPlayersMap(mapObj: any): mapObj is Map<string, PlayerType> {
    if (!(mapObj instanceof Map)) {
      return false;
    }

    for (const player of mapObj.values()) {
      if (!DatabaseService.isPlayer(player)) {
        return false;
      }
    }

    return true;
  }
}
