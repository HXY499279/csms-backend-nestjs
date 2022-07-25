import { Module } from '@nestjs/common';
import { CommodityController } from './commodity.controller';
import { CommodityService } from './commodity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Commodity, CommoditySchema, Category, CategorySchema } from '@/schema';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commodity.name, schema: CommoditySchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CommodityController],
  providers: [CommodityService, CategoryService],
  exports: [CommodityService],
})
export class CommodityModule {}
