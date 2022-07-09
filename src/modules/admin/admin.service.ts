import { Injectable } from '@nestjs/common';
import { Admin, AdminDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAdminDto } from './dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  // 检查管理员是否存在
  async check(adminaccount: string) {
    return await this.adminModel.findOne({
      adminaccount,
    });
  }

  // 新增管理员
  async create(data: RegisterAdminDto) {
    const createdAdmin = new this.adminModel(data);
    return await createdAdmin.save();
  }
}
