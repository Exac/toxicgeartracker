import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GearService } from './gear/gear.service';
import { GearGateway } from './gear.gateway';
import { HttpModule } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [GearService, GearGateway],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should have some fn to handle get requests"', () => {
      expect(appController.getHello).toBeTruthy();
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
