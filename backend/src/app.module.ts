import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GearService } from './gear/gear.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [GearService],
})
export class AppModule {}
