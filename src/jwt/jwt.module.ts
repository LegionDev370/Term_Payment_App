import { Module } from '@nestjs/common';
import { jwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt/dist';
@Module({
  imports: [JwtModule.register({})],
  providers: [jwtService],
  exports: [jwtService],
})
export class JwtModules {}
