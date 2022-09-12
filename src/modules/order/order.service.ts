import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetOrderDto, UpdateCategoryDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly userService: UserService,
  ) {}

  // 获取订单的查询参数
  private async getOrdersQuery(data: GetOrderDto) {
    const { _id: userId } = await this.userService.findOneByPhone(data.phone);
    const queryCondition = {
      status: data.status,
      user: userId,
      _id: data._id,
      time: { $gt: data.dateSta, $lt: data.dateEnd },
    };
    // 去除值为空的属性
    for (let propName in queryCondition) {
      if (
        queryCondition[propName] === '' ||
        queryCondition[propName] === 'undefined'
      ) {
        delete queryCondition[propName];
      }
      if (
        propName === 'time' &&
        (data.dateSta === undefined || data.dateEnd === undefined)
      ) {
        delete queryCondition[propName];
      }
    }
    return queryCondition;
  }

  // 获取订单
  async getOrders(data: GetOrderDto) {
    const queryCondition = this.getOrdersQuery(data);
    const [current, pageSize] = [data.current, data.pageSize].map(Number);
    return await this.orderModel
      .find(queryCondition, null, {
        skip: (current - 1) * pageSize,
        limit: pageSize,
        sort: { time: -1 },
      })
      .populate({
        path: 'user commodityDetails.commodity',
        select: 'address name phone commodityName currentPrice -_id',
      });
  }

  // 获取订单总数
  async getOrdersCount(data: GetOrderDto) {
    const queryCondition = this.getOrdersQuery(data);
    return await this.orderModel.find(queryCondition).count();
  }

  // // 通过商品分类名获取一个商品分类
  // async findOneByCategoryName(categoryName: string) {
  //   return this.categoryModel.findOne({ categoryName });
  // }

  // // 通过商品分类id获取一个商品分类
  // async findOneById(_id: string) {
  //   return this.categoryModel.findById(_id);
  // }

  // // 通过商品分类id修改一个商品分类
  // async findByIdAndUpdate(_id: string, updateDto: UpdateCategoryDto) {
  //   return this.categoryModel.findByIdAndUpdate(
  //     {
  //       _id,
  //     },
  //     {
  //       $inc: updateDto,
  //     },
  //   );
  // }

  // // 新增商品种类
  // async create(categoryName: string) {
  //   const createdCategory = new this.categoryModel({ categoryName });
  //   return await createdCategory.save();
  // }

  // // 删除商品分类
  // async deleteCategory(_id: string) {
  //   return await this.categoryModel.findByIdAndDelete(_id);
  // }
}
