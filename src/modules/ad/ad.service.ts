import { HttpException, Injectable } from '@nestjs/common';
import { Ad, AdDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveCreateAdDto, SaveUpdateAdDto } from './dto';
import { Express } from 'express';

@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name)
    private readonly adModel: Model<AdDocument>,
  ) {}

  // 获取所有广告
  async findAll() {
    return await this.adModel.find({}, null, { sort: { _id: -1 } });
  }

  // 验证图片格式和大小
  async checkPic(file: Express.Multer.File) {
    const { buffer, mimetype, size } = file;
    // 判断数据类型是否符合图片标准
    if (
      mimetype !== 'image/png' &&
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/pjpeg'
    ) {
      throw new HttpException('请上传图片', 500);
    }
    if (size > 2 * 1024 * 1024) {
      throw new HttpException('图片大小超过2mb', 500);
    }
    return {
      file: buffer,
      picMimetype: mimetype,
    };
  }

  // 新增广告
  async createAd(data: SaveCreateAdDto) {
    const createdAdmin = new this.adModel(data);
    return await createdAdmin.save();
  }

  // 修改广告图片
  async updateAdPic(data: SaveUpdateAdDto) {
    const { _id, file, picMimetype } = data;
    return this.adModel.findByIdAndUpdate(_id, { file, picMimetype });
  }

  // 删除广告
  async deleteAd(_id: string) {
    return this.adModel.findByIdAndDelete(_id);
  }
}
