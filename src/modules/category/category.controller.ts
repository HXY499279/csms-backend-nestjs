import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { GetCategoryDto, DeleteCategoryDto, CreateCategoryDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('categories')
// 配置该类资源接口的标签
@ApiTags('商品分类')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all-categories/:count/:pageSize')
  // 配置接口功能说明
  @ApiOperation({
    summary: '分页获取商品分类',
  })
  async getCategory(@Param() params: GetCategoryDto) {
    const { count, pageSize } = params;
    const total = await this.categoryService.getCategorysCount();
    const categorys = await this.categoryService.findByPage({
      count,
      pageSize,
    });
    return { data: categorys, total };
  }

  @Post('/category')
  @ApiOperation({
    summary: '新增商品分类',
  })
  async createCategory(@Body() data: CreateCategoryDto) {
    const { categoryName, curTotal } = data;
    const category = await this.categoryService.findOneByCategoryName(
      categoryName,
    );
    if (category) {
      throw new HttpException('该商品分类已经存在', 400);
    }
    await this.categoryService.create(categoryName);
    const categories = await this.categoryService.findByPage({
      count: '1',
      pageSize: String(curTotal),
    });
    return { data: categories, msg: '新增商品分类成功' };
  }

  @Delete('/category/:_id/:curTotal')
  @ApiOperation({
    summary: '删除商品分类',
  })
  async deleteCategory(@Param() params: DeleteCategoryDto) {
    const { _id, curTotal } = params;
    const category = await this.categoryService.findOneById(_id);
    if (category.total > 0) {
      throw new HttpException('该商品分类下还有商品', 500);
    }
    await this.categoryService.deleteCategory(_id);
    const categories = await this.categoryService.findByPage({
      count: '1',
      pageSize: curTotal,
    });
    return {
      data: categories,
      msg: '删除商品分类成功',
    };
  }
}
