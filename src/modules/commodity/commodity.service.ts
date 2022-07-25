import { HttpException, Injectable } from '@nestjs/common';
import { Commodity, CommodityDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QueryCommodityByPageStrictDto,
  SaveCreateCommodityDto,
  QueryCommodityStrictDto,
  SaveUpdateCommodityDto,
} from './dto';

@Injectable()
export class CommodityService {
  constructor(
    @InjectModel(Commodity.name)
    private readonly commodityModel: Model<CommodityDocument>,
  ) {}

  // 获取指定条件商品的数量
  async getCommodityCount(queryCondition: QueryCommodityStrictDto) {
    return await this.commodityModel.find(queryCondition).count();
  }

  // 分页获取指定条件的商品
  async findByPage(queryConditionByPage: QueryCommodityByPageStrictDto) {
    const { count, pageSize } = queryConditionByPage;
    delete queryConditionByPage.count;
    delete queryConditionByPage.pageSize;
    const queryCondition = queryConditionByPage;
    return await this.commodityModel.aggregate([
      {
        $sort: { _id: -1 },
      },
      {
        $match: queryCondition,
      },
      {
        $skip: (+count - 1) * +pageSize,
      },
      {
        $limit: +pageSize,
      },
      {
        $lookup: {
          from: 'categories', // 右集合
          localField: 'category_id', // 左集合 join 字段
          foreignField: '_id', // 右集合 join 字段
          as: 'category', // 新生成字段（类型array）
        },
      },
      {
        // 去掉外层的数组
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          'category._id': 0,
          'category.total': 0,
        },
      },
    ]);
  }

  // 新增商品
  async createCommodity(data: SaveCreateCommodityDto) {
    const createdCommodity = new this.commodityModel(data);
    return await createdCommodity.save();
  }

  // 修改商品信息
  async updateCommodity(_id: string, data: SaveUpdateCommodityDto) {
    return this.commodityModel.findByIdAndUpdate(_id, data);
  }

  // 删除广告
  async deleteCommodity(_id: string) {
    return this.commodityModel.findByIdAndDelete(_id);
  }
}
