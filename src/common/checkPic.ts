import { HttpException } from '@nestjs/common';

// 验证图片格式和大小
export const checkPic = (file: Express.Multer.File) => {
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
};
