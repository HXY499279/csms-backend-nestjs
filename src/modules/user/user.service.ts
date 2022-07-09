import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto, GetUserDto, _IdDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // 分页获取用户
  async findAll(data: GetUserDto) {
    const [current, pageSize] = [data.current, data.pageSize].map(Number);
    return await this.userModel.find({}, null, {
      skip: (current - 1) * pageSize,
      limit: pageSize,
    });
  }

  // 获取单个用户
  async findOne(data: _IdDto): Promise<any> {
    return await this.userModel.findOne(data);
  }

  // 修改某个用户的密码
  async updateUserPwd(data: UpdateUserDto) {
    const { _id, modifiedpassword } = data;
    return await this.userModel.findByIdAndUpdate(_id, {
      userpwd: modifiedpassword,
    });
  }

  // 删除某个用户
  async deleteUser(data: _IdDto) {
    return await this.userModel.findByIdAndDelete(data._id);
  }
}
