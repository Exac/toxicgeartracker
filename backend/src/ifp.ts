// Types from query to Ironforge.pro's API. If the character does not exist, IFP responds with a 404
// https://ironforge.pro/api/players?player=Epuration-Fairbanks
export type IFPRequest = {
  gear: IFPCharacter;
  latestGear: {
    '1002'?: { gear: IFPCharacter; date: string }; // "2020-08-07" // Current gear
    '1000': { gear: IFPCharacter; date: string }; // "2020-07-30"
  };
  info: IFPPlayerInfo;
};
export type IFPGear = {
  id: number; // 19019
  gs: string; // "80"
  rarity:
    | 'poor'
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'epic'
    | 'legendary'
    | 'artifact';
  name: string; // "Thunderfury, Blessed Blade of the Windseeker"
  enchantID?: number;
  enchantName?: string;
};
export type IFPPlayerInfo = {
  id: number; // 624
  name: string; // Bhany
  server: string; // Fairbanks
  spec:
    | 'Druid'
    | 'Hunter'
    | 'Mage'
    | 'Paladin'
    | 'Priest'
    | 'Rogue'
    | 'Shaman'
    | 'Warlock'
    | 'Warrior'; // Warrior
  race: 'Alliance' | 'Horde'; // Alliance
  region: string; // US
  updated: string; // "2020-08-07T00:00:00"
  updated_items: string; // "2020-08-07"
};
export type IFPCharacter = {
  Neck: IFPGear[];
  Chest: IFPGear[];
  Finger: IFPGear[];
  Trinket: IFPGear[];
  'Main Hand'?: IFPGear[];
  Ranged?: IFPGear[];
  Tabard: IFPGear[];
  Head: IFPGear[];
  Waist: IFPGear[];
  Back: IFPGear[];
  Shoulder: IFPGear[];
  Legs: IFPGear[];
  Shirt: IFPGear[];
  Wrist: IFPGear[];
  Feet: IFPGear[];
  Hands: IFPGear[];
  'Two Hand'?: IFPGear[];
};
