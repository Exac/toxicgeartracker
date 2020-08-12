import { Test, TestingModule } from '@nestjs/testing';
import { GearService } from './gear.service';
import { request } from './request.fixture';
import { Player } from '../player';
import { HttpModule } from '@nestjs/common';

describe('GearService', () => {
  let service: GearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GearService],
    }).compile();

    service = module.get<GearService>(GearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert a request from IFP into our Player datastructure', () => {
    // Arrange
    const req = request;
    const isPlayer = (req: Player | unknown): req is Player => {
      return (
        typeof (req as Player).name === 'string' &&
        typeof (req as Player).server === 'string' &&
        typeof (req as Player).updated === 'string' &&
        typeof (req as Player).gear === 'object' &&
        typeof (req as Player).wearing === 'object'
      );
    };

    // Act
    const result: Player = GearService.convertIFPRequestToGear(req);

    // Assert
    expect(isPlayer(result)).toBeTruthy();
  });
});
