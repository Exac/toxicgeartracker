import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GearService {

  constructor(private http: HttpClient) {
  }

  fetchPlayersGear(player: string): Observable<IFPRequest> {
    const server: string = environment.server;
    return this.http
      .get<IFPRequest>(`https://ironforge.pro/api/players?player=${player}-${server}`)
      .pipe(
        tap(x => console.log(x))
      );

  }


}

// Types from query to Ironforge.pro's API. If the character does not exist, IFP responds with a 404
// https://ironforge.pro/api/players?player=Exac-Fairbanks
export type IFPRequest = {
  gear: IFPCharacter,
  latestGear: {
    '1002': IFPCharacter & { date: string }, // "2020-08-07" // Current gear
    '1000': IFPCharacter & { date: string } // "2020-07-30"
  },
  info: IFPPlayerInfo
};
type IFPGear = {
  id: number, // 19019
  gs: string, // "80"
  rarity: 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact',
  name: string, // "Thunderfury, Blessed Blade of the Windseeker"
};
type IFPPlayerInfo = {
  id: number, // 624
  name: string, // Bhany
  server: string, // Fairbanks
  spec: string, // Warrior
  race: 'Alliance' | 'Horde', // Alliance
  region: string, // US
  updated: string, // "2020-08-07T00:00:00"
  updated_items: string // "2020-08-07"
};
type IFPCharacter = {
  'Neck': IFPGear[],
  'Chest': IFPGear[],
  'Finger': IFPGear[],
  'Trinket': IFPGear[],
  'Main Hand': IFPGear[],
  'Ranged': IFPGear[],
  'Tabard': IFPGear[],
  'Head': IFPGear[],
  'Waist': IFPGear[],
  'Back': IFPGear[],
  'Shoulder': IFPGear[],
  'Legs': IFPGear[],
  'Off Hand': IFPGear[],
  'Shirt': IFPGear[],
  'Wrist': IFPGear[],
  'Feet': IFPGear[],
  'Hands': IFPGear[],
  'Two Hand': IFPGear[],
};
