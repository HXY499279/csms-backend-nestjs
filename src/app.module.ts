import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import {
  UserModule,
  AuthModule,
  AdminModule,
  AdModule,
  CategoryModule,
} from './modules';
import { MongooseModule } from '@nestjs/mongoose';

const { host, port,user,pwd, databse_name } = configuration().database.mongodb;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // mongodb数据库连接
    MongooseModule.forRoot(`mongodb://${user}:${pwd}@${host}:${port}/${databse_name}`),
    AdminModule,
    UserModule,
    AdModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
