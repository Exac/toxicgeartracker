import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Equips, Item, Player } from 'toxicgeartracker-shared';
import { IFPCharacter, IFPGear, IFPRequest } from '../ifp';
import { map } from 'rxjs/operators';

@Injectable()
export class GearService {
  constructor(private readonly httpService: HttpService) {}

  /** Get the player's gear. This takes 5+ seconds. */
  getPlayer(character: string, server: string): Observable<Player> {
    const uri: string = `https://ironforge.pro/api/players?player=${character}-${server}`;
    return this.httpService
      .get<IFPRequest>(uri)
      .pipe(
        map(request => GearService.convertIFPRequestToPlayer(request.data))
      );
  }

  static convertIFPRequestToPlayer(request: IFPRequest): Player {
    const gear: Equips = GearService.convertIFPCharacterToEquips(request.gear);
    const wearing: Equips = GearService.convertIFPCharacterToEquips(
      request.latestGear['1002'].gear,
    );
    return {
      name: request.info.name,
      server: request.info.server,
      class: request.info.spec,
      updated: request.info.updated,
      gear,
      wearing,
    };
  }

  private static convertIFPCharacterToEquips(character: IFPCharacter): Equips {
    return {
      Head: GearService.convertIFPGearArrayToItemArray(character.Head),
      Neck: GearService.convertIFPGearArrayToItemArray(character.Neck),
      Shoulder: GearService.convertIFPGearArrayToItemArray(character.Shoulder),
      Chest: GearService.convertIFPGearArrayToItemArray(character.Chest),
      Back: GearService.convertIFPGearArrayToItemArray(character.Back),
      Shirt: GearService.convertIFPGearArrayToItemArray(character.Shirt),
      Tabard: GearService.convertIFPGearArrayToItemArray(character.Tabard),
      Wrist: GearService.convertIFPGearArrayToItemArray(character.Wrist),
      Hands: GearService.convertIFPGearArrayToItemArray(character.Hands),
      Waist: GearService.convertIFPGearArrayToItemArray(character.Waist),
      Legs: GearService.convertIFPGearArrayToItemArray(character.Legs),
      Feet: GearService.convertIFPGearArrayToItemArray(character.Feet),
      Finger: GearService.convertIFPGearArrayToItemArray(character.Finger),
      Trinket: GearService.convertIFPGearArrayToItemArray(character.Trinket),
      'Main Hand': GearService.convertIFPGearArrayToItemArray(
        character['Main Hand'],
      ),
      'Two Hand': GearService.convertIFPGearArrayToItemArray(
        character['Two Hand'],
      ),
      Ranged: GearService.convertIFPGearArrayToItemArray(character.Ranged),
    };
  }

  private static convertIFPGearArrayToItemArray(gearArray?: IFPGear[]): Item[] {
    if (gearArray === undefined) {
      return [];
    }
    return gearArray.map(gear => GearService.convertIFPGearToItem(gear));
  }

  private static convertIFPGearToItem(gear: IFPGear): Item {
    return {
      name: gear.name,
      id: gear.id,
    };
  }
}
