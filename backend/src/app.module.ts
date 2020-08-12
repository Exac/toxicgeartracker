import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GearService } from './gear/gear.service';
import { GearGateway } from './gear.gateway';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [GearService, GearGateway],
})
export class AppModule {}
