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
    public name: string = '',
    public server: string = '',
    public spec:
      | "Druid"
      | "Hunter"
      | "Mage"
      | "Paladin"
      | "Priest"
      | "Rogue"
      | "Shaman"
      | "Warlock"
      | "Warrior" = 'Warrior',
    public updated: string = '2004-11-23',
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
    const lsPlayers: string | null = localStorage.getItem("players");
    return new Map();
  }

  static isPlayersMap(obj: any): obj is Map<string, PlayerType> {
    if (obj instanceof Map) {
      return false;
    }
    for (const [key, value] of obj.entries()) {
      for (const [k] of [Object.keys(new Player())]) {
        console.log(k);
      }
      const checks = {
        name: () => {}
      };
    }

    return true;
  }
}
