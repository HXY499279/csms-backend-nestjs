import { Module } from '@nestjs/common';
import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from '@/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }])],
  controllers: [AdController],
  providers: [AdService],
  exports: [AdService],
})
export class AdModule {}
