import { Body, Controller, Get, Post } from '@nestjs/common';
import { GearService } from './gear/gear.service';

export class PostRootDto {}

@Controller()
export class AppController {
  constructor(private readonly gearService: GearService) {}

  @Get()
  async getRoot(): Promise<string> {
    return '{}';
  }

  @Post()
  async postRoot(@Body() postRootDto: PostRootDto): Promise<string> {
    return '{}';
  }
}
