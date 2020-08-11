import { Test, TestingModule } from '@nestjs/testing';
import { GearGateway } from './gear.gateway';
import { GearService } from './gear/gear.service';
import { HttpModule } from '@nestjs/common';

describe('GearGateway', () => {
  let gateway: GearGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GearGateway, GearService],
    }).compile();

    gateway = module.get<GearGateway>(GearGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
