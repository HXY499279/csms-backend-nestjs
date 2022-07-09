import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminToken } from '@/const';
import { configuration } from '@/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const config = configuration();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwt.secret_key,
    });
  }

  async validate(payload: AdminToken) {
    // Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上。
    return {
      _id: payload._id,
      adminaccount: payload.adminaccount,
      name: payload.name,
    };
  }
}
