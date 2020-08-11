import { HttpService, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class GearService {
  constructor(private httpService: HttpService) { }

  getGear(character: string, server: string): Observable<string> {
    return of('');
  }
}
