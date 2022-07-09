import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy'
import { UserModule } from "../user";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('auth.jwt.secret_key'),
          signOptions: {
            expiresIn: configService.get('auth.jwt.expire_time'),
          },
        };
      },
      inject: [ConfigService],
    }),

  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
