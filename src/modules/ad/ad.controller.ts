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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdService } from './ad.service';
import { CreateAdDto, UpdateAdDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('/ads')
// 配置该类资源接口的标签
@ApiTags('广告')
export class AdController {
  constructor(private adService: AdService) {}

  @Get('/all-ads')
  // 配置接口功能说明
  @ApiOperation({
    summary: '获取所有广告',
  })
  async getAllAds() {
    return await this.adService.findAll();
  }

  @Post('/ad')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '新增广告',
  })
  async createAd(
    @Body() addto: CreateAdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileParams = await this.adService.checkPic(file);
    this.adService.createAd({ ...addto, ...fileParams });
    return {
      msg: '新增广告成功',
    };
  }

  @Put('/ad')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '修改广告图片',
  })
  async updateAdPic(
    @Body() addto: UpdateAdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileParams = await this.adService.checkPic(file);
    this.adService.updateAdPic({ ...fileParams, ...addto });
    return {
      msg: '修改广告图片成功',
    };
  }

  @Delete('/ad/:_id')
  @ApiOperation({
    summary: '删除广告',
  })
  async deleteAd(@Param('_id') _id: string) {
    this.adService.deleteAd(_id);
    return {
      msg: '删除广告成功',
    };
  }
}
