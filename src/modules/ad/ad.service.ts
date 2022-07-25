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

  // 新增广告
  async createAd(data: SaveCreateAdDto) {
    const createdAd = new this.adModel(data);
    return await createdAd.save();
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
