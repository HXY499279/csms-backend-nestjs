import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // 分页获取商品种类
  async findByPage(data: GetCategoryDto) {
    const [count, pageSize] = [data.count, data.pageSize].map(Number);
    return await this.categoryModel.find({}, null, {
      skip: (count - 1) * pageSize,
      limit: pageSize,
      sort: { _id: -1 },
    });
  }

  // 获取商品种类总数
  async getCategorysCount() {
    return await this.categoryModel.find({}).count();
  }

  // 通过商品分类名获取一个商品分类
  async findOneByCategoryName(categoryName: string) {
    return this.categoryModel.findOne({ categoryName });
  }

  // 通过商品分类id获取一个商品分类
  async findOneById(_id: string) {
    return this.categoryModel.findById(_id);
  }

  // 通过商品分类id修改一个商品分类
  async findByIdAndUpdate(_id: string, updateDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(
      {
        _id,
      },
      {
        $inc: updateDto,
      },
    );
  }

  // 新增商品种类
  async create(categoryName: string) {
    const createdCategory = new this.categoryModel({ categoryName });
    return await createdCategory.save();
  }

  // 删除商品分类
  async deleteCategory(_id: string) {
    return await this.categoryModel.findByIdAndDelete(_id);
  }
}
