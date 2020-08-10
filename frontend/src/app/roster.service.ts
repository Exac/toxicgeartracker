import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  catchError,
  debounceTime,
  flatMap,
  map,
} from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor(private http: HttpClient) {
  }

  /** Get a list of players that were in the most recent raids */
  fetchRoster(): Observable<string[]> {
    const roster: Map<string, null> = new Map(); // Store players' names in this map as keys.
    // First, get logs from the guild's last 10 raids.
    return this.fetchGuildLogs().pipe(
      // Make a request to WCL for each log, and get the list of players in each raid
      map(fights => fromArray(fights.map(fight => this.fetchPlayersFromLog(fight))).pipe()),
      flatMap((value: Observable<Observable<string[]>>) => value), // Flatten the
      flatMap((value: Observable<string[]>) => value), // observables.
      map((value: string[]) => {
        value.map(v => roster.set(v, null)); // Add all names into the roster
        return Array.from(roster.keys()); // Every time this returns it can grow in size.
      }),
      debounceTime(500) // No need to return 10 times...
    );
  }

  /**
   * Get the most recent logs from your warcraftlogs account.
   * @param count Number of recently uploaded logs to find active players from.
   * @private
   */
  private fetchGuildLogs(count: number = 10): Observable<string[]> {
    return this.http
      .get<WCLReportsUserOwnerResponse | WCLError>(`https://classic.warcraftlogs.com/v1/reports/user/${environment.wclAccount}?api_key=${environment.wclApiKey}`)
      .pipe(
        map(response => isWCLError(response) ? [] : response), // Results are empty if WCL returns an error.
        map((logs: WCLReportsUserOwnerFight[]) => logs.map((log: WCLReportsUserOwnerFight) => log.id)),
        map((ids: string[]) => ids.slice(0, count)), // Remove old logs.
        catchError(() => []) // Return empty results if there was some other problem with the request.
      );
  }

  /**
   * Get a list of raid members for the supplied WCL fights.
   * @param fight The id of a WCL log.
   * @private
   */
  private fetchPlayersFromLog(fight: string): Observable<string[]> {
    return this.http
      .get<WCLReportFightCodeResponse | WCLError>(`https://classic.warcraftlogs.com:443/v1/report/fights/${fight}?api_key=${environment.wclApiKey}`)
      .pipe(
        // If there is an error from WCL, just return an empty array.
        map(response => isWCLError(response) ? { exportedCharacters: [] } as unknown as WCLReportFightCodeResponse : response),
        map((log: WCLReportFightCodeResponse) => log.exportedCharacters), // Extract the list of characters from the log
        map((characters: WCLReportFightCodeExportedCharacter[]) => characters.map((character) => character.name)),
        catchError((err) => {console.log({err}); return [];}) // Return empty if there is an error.
      );
  }
}

/** Type Guard */
function isWCLError(data: WCLError | WCLReportsUserOwnerResponse | WCLReportFightCodeResponse): data is WCLError {
  return (data as WCLError).error !== undefined;
}

// Response from WCL when request fails
type WCLError = {
  status: number;
  error: string;
};

// Types from query to reports/user/{owner}
// https://classic.warcraftlogs.com/v1/reports/user/pronator?api_key=688e15caae84a659990c486a78fc6383
type WCLReportsUserOwnerResponse = WCLReportsUserOwnerFight[];
type WCLReportsUserOwnerFight = {
  id: string; // "hqFJYGZ4B9KRQCyz"
  title: string; // "MC Alt Raid"
  owner: string; // "pronator"
  start: number; // 1596167134813
  end: number; // 1596173775059
  zone: number; // 1000
};

// Types from query to report/fight/{code}
// https://www.warcraftlogs.com:443/v1/report/fights/hqFJYGZ4B9KRQCyz?api_key=688e15caae84a659990c486a78fc6383
type WCLReportFightCodeResponse = {
  fights: WCLReportFightCodeFight[];
  language: string; // "en"
  friendlies: WCLReportFightCodeUnit[]; // Includes players outside raid and NPCs identifiable by type "Boss", etc.
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
  exportedCharacters: WCLReportFightCodeExportedCharacter[];
};
type WCLReportFightCodeUnit = {
  name: string; // "Summoned Skeleton"
  id: number; // 19
  guid: number; // 5046475
  type: string; // "Warrior" "Boss" "Unknown" "NPC" "Pet"
  server?: string; // "Fairbanks"
  icon: string; // "Warrior-Fury"
  petOwner?: number;
  fights: WCLReportFightCodeFight[]; // Players in the raid from a log!
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
