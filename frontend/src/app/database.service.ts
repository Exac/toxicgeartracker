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
  constructor(
    public name: string = "",
    public server: string = "",
    public spec:
      | "Druid"
      | "Hunter"
      | "Mage"
      | "Paladin"
      | "Priest"
      | "Rogue"
      | "Shaman"
      | "Warlock"
      | "Warrior" = "Warrior",
    public updated: string = "2004-11-23",
    public gear: Equips = new Equips(),
    public wearing: Equips = new Equips()
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor() {}

  getPlayers(): Map<string, PlayerType> {
    const dbPlayersStr: string | null = localStorage.getItem("players");
    console.warn({ dbPlayersStr });
    let dbPlayersEntries: [] | undefined;
    try {
      dbPlayersEntries = dbPlayersStr !== null ? JSON.parse(dbPlayersStr) : [];
      console.warn({ dbPlayersEntries });
      if(dbPlayersEntries === undefined) {
        console.warn(`Parsed dbPlayersEntries was undefined`);
        return new Map();
      }
    } catch (e) {
      console.warn(`Couldn't parse string:`,dbPlayersStr, e);
      return new Map();
    }
    const dbPlayersMap = new Map(dbPlayersEntries);
    console.log({dbPlayersEntries: JSON.stringify(dbPlayersEntries)}, {dbPlayersMap});
    if(DatabaseService.isPlayersMap(dbPlayersMap)) {
      return dbPlayersMap;
    } else {
      console.warn(`Database's players map was invalid`);
      return new Map();
    }
  }

  /** Validate player maps */
  static isPlayersMap(mapObj: any): mapObj is Map<string, PlayerType> {
    if (!(mapObj instanceof Map)) {
      return false;
    }

    for (const [_name, player] of mapObj.entries()) {
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
      if (player?.gear?.head?.id && typeof player.gear.head.id !== "number") {
        return false;
      }
    }

    return true;
  }
}
