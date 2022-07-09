import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminToken } from '@/const';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: AdminToken) {
    return this.jwtService.sign(payload);
  }
}
