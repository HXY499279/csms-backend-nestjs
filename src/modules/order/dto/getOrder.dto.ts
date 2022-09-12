import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { WILL_DELIVERY, DELIVERY, SUCCESS, REFUND, REFUNDED } from '@/const';
import { Types } from 'mongoose';

type StatusType = WILL_DELIVERY | DELIVERY | SUCCESS | REFUND | REFUNDED;

export class GetOrderDto {
  @ApiProperty({ description: '订单状态', example: 'success' })
  @IsNotEmpty({ message: '请填写订单状态' })
  status: StatusType;

  @ApiProperty({ description: '用户电话', example: '123456', required: false })
  @IsOptional()
  @IsNumberString()
  phone: string | undefined;

  @ApiProperty({ description: '订单id', example: '', required: false })
  @IsOptional()
  _id: Types.ObjectId | undefined;

  @ApiProperty({ description: '起始时间', example: '', required: false })
  @IsOptional()
  dateSta: Date | undefined;

  @ApiProperty({ description: '终止时间', example: '', required: false })
  @IsOptional()
  dateEnd: Date | undefined;

  @ApiProperty({ description: '当前页码', example: '1' })
  @IsNotEmpty({ message: '请填写当前页码' })
  @IsNumberString()
  current: string;

  @ApiProperty({ description: '每页数据量', example: '6' })
  @IsNotEmpty({ message: '请填写每页数据量' })
  @IsNumberString()
  pageSize: string;
}
