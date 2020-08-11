export type Player = {
  name: string;
  server: string;
  class: 'Druid' | 'Hunter' | 'Mage' | 'Paladin' | 'Priest' | 'Rogue' | 'Shaman' | 'Warlock' | 'Warrior';
  updated: string;
  gear: Equips;
  wearing: Equips;
};

export type Equips = {
  'Head': Item[],
  'Neck': Item[],
  'Shoulder': Item[],
  'Chest': Item[],
  'Back': Item[],
  'Shirt': Item[],
  'Tabard': Item[],
  'Wrist': Item[],
  'Hands': Item[],
  'Waist': Item[],
  'Legs': Item[],
  'Feet': Item[],
  'Finger': Item[],
  'Trinket': Item[],
  'Main Hand': Item[],
  'Two Hand': Item[],
  'Ranged': Item[],
};

export type Item = {
  name: string;
  id: number;
};

