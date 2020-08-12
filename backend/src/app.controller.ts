import { Controller, Get } from '@nestjs/common';
import { GearService } from './gear/gear.service';

@Controller()
export class AppController {
  constructor(private readonly gearService: GearService) {}

  @Get()
  async getHello(): Promise<string> {
    const response = await this.gearService
      .getGear('exac', 'fairbanks')
      .toPromise();
    return JSON.stringify(response);
  }
}
