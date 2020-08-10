import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor() { }
}

// Response from WCL when request fails
type WCLError = {
  status: number;
  error: string;
};

// Types from query to report/fight/{code}
// `https://classic.warcraftlogs.com/v1/reports/guild/toxic/fairbanks/us?api_key=688e15caae84a659990c486a78fc6383`
type WCLReportFightCodeResponse = {
  fights: WCLReportFightCodeFight[];
  language: string; // "en"
  friendlies: WCLReportFightCodeUnit[];
  enemies: WCLReportFightCodeUnit[];
  friendlyPets: WCLReportFightCodeUnit[];
  enemyPets: WCLReportFightCodeUnit[];
  phases: [];
  logVersion: number; // 14
  gameVersion: number; // 2
  title: string; // "MC Alt Raid"
  owner: string; // "pronator"
  start: number; // 1596167134813
  end: number; // 1596173775059
  zone: number; // 1000
  exportedCharacters: [];
};
type WCLReportFightCodeUnit = {
  name: string; // "Summoned Skeleton"
  id: number; // 19
  guid: number; // 5046475
  type: string; // "Warrior" "Boss" "Unknown" "NPC" "Pet"
  server?: string; // "Fairbanks"
  icon: string; // "Warrior-Fury"
  petOwner?: number;
  fights: WCLReportFightCodeFight[];
};
type WCLReportFightCodeFight = {
  id: number; // 286
  start_time?: number; // 95991 - ms relative to start of raid
  endtime?: number; // 120691
  boss?: number; // 664
  name?: string; // "The Twin Emperors"
  size?: number; // 40
  difficulty?: number; // 3
  kill?: boolean; // true - as opposed to false for wipe attempt
  partial?: number; // 2
  hasWorldBuffs?: boolean; // true
  fightPercentage?: number; // 0
  lastPhaseForPercentageDisplay?: number;
  maps: [];
  instances?: number; // 1
};
type WCLReportFightCodeExportedCharacter = {
  id: number; // 40692266
  name: string; // "Carissa"
  server: string; // "Fairbanks"
  region: string; // "US"
};
