import { Equips } from "./equips";

export type Player = {
  name: string;
  server: string;
  class:
    | "Druid"
    | "Hunter"
    | "Mage"
    | "Paladin"
    | "Priest"
    | "Rogue"
    | "Shaman"
    | "Warlock"
    | "Warrior";
  updated: string;
  gear: Equips;
  wearing: Equips;
};
