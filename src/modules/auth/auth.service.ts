import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@/const'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService) { }

    createToken(payload: IUser) {
        return this.jwtService.sign(payload);
    }
}
