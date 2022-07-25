import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommodityService } from './commodity.service';
import { CategoryService } from '../category/category.service';
import {
  CreateCommodityDto,
  DeleteCommodityByPageDto,
  QueryCommodityByPageDto,
  QueryCommodityDto,
  QueryCommodityStrictDto,
  SaveCreateCommodityDto,
  SaveUpdateCommodityDto,
  UpdateCommodityDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { checkPic } from '@/common';

const ObjectId = Types.ObjectId;

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('/commodities')
// 配置该类资源接口的标签
@ApiTags('商品')
export class CommodityController {
  constructor(
    private commodityService: CommodityService,
    private categoryService: CategoryService,
  ) {}

  @Get('/all-commodities')
  // 配置接口功能说明
  @ApiOperation({
    summary: '分页获取商品',
  })
  async getCommodityByPage(@Query() query: QueryCommodityByPageDto) {
    const { count, pageSize, category_id } = query;
    console.log(query);

    // 去除值为空的属性
    for (let propName in query) {
      if (query[propName] === '' || query[propName] === undefined) {
        delete query[propName];
      }
    }

    const queryCondition: QueryCommodityStrictDto = {};

    // 对商品名字进行模糊匹配
    query.commodityName
      ? (queryCondition.commodityName = new RegExp(
          `${query.commodityName}`,
          'ig',
        ))
      : 0;
    // 将数据做类型转换
    query.category_id
      ? (queryCondition.category_id = new ObjectId(category_id))
      : 0;
    query.popularity ? (queryCondition.popularity = query.popularity * 1) : 0;
    query.inventoryStatus
      ? (queryCondition.inventoryStatus = query.inventoryStatus * 1)
      : 0;

    const total = await this.commodityService.getCommodityCount(queryCondition);
    const queryConditionByPage = {
      ...queryCondition,
      count,
      pageSize,
    };
    const commodities = await this.commodityService.findByPage(
      queryConditionByPage,
    );
    return {
      data: commodities,
      total,
      message: '商品获取成功',
    };
  }

  @Post('/commodity')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '新增商品',
  })
  async createCommodity(
    @Body() commoditydto: CreateCommodityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileParams = checkPic(file);
    const SaveCreateCommodityDto: SaveCreateCommodityDto = {
      ...commoditydto,
      ...fileParams,
      category_id: new ObjectId(commoditydto.category_id),
    };

    const commodity = this.commodityService.createCommodity(
      SaveCreateCommodityDto,
    );
    if (commodity) {
      const { category_id } = commoditydto;
      await this.categoryService.findByIdAndUpdate(category_id, { total: 1 });
      return {
        msg: '商品新增成功',
      };
    }
  }

  @Put('/commodity')
  @ApiOperation({
    summary: '修改商品信息',
  })
  async updateCommodity(@Body() Commoditydto: UpdateCommodityDto) {
    const {
      _id,
      currentPrice,
      cost,
      inventory,
      sellingUnit,
      danger_inventory,
    } = Commoditydto;
    const saveUpdateCommodityDto: SaveUpdateCommodityDto = {
      currentPrice,
      cost,
      inventory,
      sellingUnit,
      danger_inventory,
      inventoryStatus: 1,
    };

    if (inventory <= danger_inventory) {
      saveUpdateCommodityDto.inventoryStatus = 0;
    }

    await this.commodityService.updateCommodity(_id, saveUpdateCommodityDto);
    return {
      msg: '修改商品信息成功',
    };
  }

  @Delete('/commodity/:_id/:curTotal/:category_id')
  @ApiOperation({
    summary: '删除广告',
  })
  async deleteAd(@Param() data: DeleteCommodityByPageDto) {
    const { _id, curTotal, category_id } = data;
    const commodity = await this.commodityService.deleteCommodity(_id);
    const commodities = await this.commodityService.findByPage({
      count: '1',
      pageSize: curTotal,
    });
    if (commodity) {
      await this.categoryService.findByIdAndUpdate(category_id, { total: -1 });
      return {
        data: commodities,
        msg: '删除商品成功',
      };
    } else {
      return {
        msg: '商品不存在',
      };
    }
  }
}
