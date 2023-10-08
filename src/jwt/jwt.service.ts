import { JwtService } from '@nestjs/jwt/dist';
import { Injectable } from '@nestjs/common';
@Injectable()
export class jwtService {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(payload: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  async verify(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
  }
}
