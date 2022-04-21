import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { UserModule } from './modules/user'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('database.mysql.host'),
      port: configService.get('database.mysql.port'),
      username: configService.get('database.mysql.user'),
      password: configService.get('database.mysql.pwd'),
      database: configService.get('database.mysql.databse_name'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    inject: [ConfigService]
  }),
    UserModule, AuthModule],

  controllers: [],
  providers: [],
})
export class AppModule { }
