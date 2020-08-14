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
      spec: request.info.spec,
      updated: request.info.updated,
      gear,
      wearing,
    };
  }

  private static convertIFPCharacterToEquips(character: IFPCharacter): Equips {
    return {
      head: GearService.convertIFPGearArrayToItemArray(character.Head),
      neck: GearService.convertIFPGearArrayToItemArray(character.Neck),
      shoulder: GearService.convertIFPGearArrayToItemArray(character.Shoulder),
      chest: GearService.convertIFPGearArrayToItemArray(character.Chest),
      back: GearService.convertIFPGearArrayToItemArray(character.Back),
      shirt: GearService.convertIFPGearArrayToItemArray(character.Shirt),
      tabard: GearService.convertIFPGearArrayToItemArray(character.Tabard),
      wrist: GearService.convertIFPGearArrayToItemArray(character.Wrist),
      hands: GearService.convertIFPGearArrayToItemArray(character.Hands),
      waist: GearService.convertIFPGearArrayToItemArray(character.Waist),
      legs: GearService.convertIFPGearArrayToItemArray(character.Legs),
      feet: GearService.convertIFPGearArrayToItemArray(character.Feet),
      finger: GearService.convertIFPGearArrayToItemArray(character.Finger),
      trinket: GearService.convertIFPGearArrayToItemArray(character.Trinket),
      mainHand: GearService.convertIFPGearArrayToItemArray(
        character['Main Hand'],
      ),
      twoHand: GearService.convertIFPGearArrayToItemArray(
        character['Two Hand'],
      ),
      ranged: GearService.convertIFPGearArrayToItemArray(character.Ranged),
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
