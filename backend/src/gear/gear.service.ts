import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Equips, Item, Player } from '../player';
import { IFPCharacter, IFPGear, IFPRequest } from '../ifp';

@Injectable()
export class GearService {
  constructor(private readonly httpService: HttpService) { }

  stub() {
    return this.httpService.get('http://google.com').subscribe();
  }

  getGear(character: string, server: string): Observable<string> {

    return of('getGear');
  }

  static convertIFPRequestToGear(request: IFPRequest): Player {
    const gear: Equips = GearService.convertIFPCharacterToEquips(request.gear);
    const wearing: Equips = GearService.convertIFPCharacterToEquips(request.latestGear['1002'].gear);
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
      'Head': GearService.convertIFPGearArrayToItemArray(character.Head),
      'Neck': GearService.convertIFPGearArrayToItemArray(character.Neck),
      'Shoulder': GearService.convertIFPGearArrayToItemArray(character.Shoulder),
      'Chest': GearService.convertIFPGearArrayToItemArray(character.Chest),
      'Back': GearService.convertIFPGearArrayToItemArray(character.Back),
      'Shirt': GearService.convertIFPGearArrayToItemArray(character.Shirt),
      'Tabard': GearService.convertIFPGearArrayToItemArray(character.Tabard),
      'Wrist': GearService.convertIFPGearArrayToItemArray(character.Wrist),
      'Hands': GearService.convertIFPGearArrayToItemArray(character.Hands),
      'Waist': GearService.convertIFPGearArrayToItemArray(character.Waist),
      'Legs': GearService.convertIFPGearArrayToItemArray(character.Legs),
      'Feet': GearService.convertIFPGearArrayToItemArray(character.Feet),
      'Finger': GearService.convertIFPGearArrayToItemArray(character.Finger),
      'Trinket': GearService.convertIFPGearArrayToItemArray(character.Trinket),
      'Main Hand': GearService.convertIFPGearArrayToItemArray(character['Main Hand']),
      'Two Hand': GearService.convertIFPGearArrayToItemArray(character['Two Hand']),
      'Ranged': GearService.convertIFPGearArrayToItemArray(character.Ranged),
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
