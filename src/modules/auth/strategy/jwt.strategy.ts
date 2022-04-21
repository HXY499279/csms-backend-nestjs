import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from '@/const'
import { configuration } from '@/config'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const config = configuration()
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.auth.jwt.secret_key,
        });
    }

    async validate(payload: IUser) {
        return { email: payload.email, password: payload.password };
    }
}