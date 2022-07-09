import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { UserModule, AuthModule, AdminModule ,AdModule} from './modules';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // 数据库连接
    MongooseModule.forRoot('mongodb://localhost:27017/csms_mislab'),
    AdminModule,
    UserModule,
    AdModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
