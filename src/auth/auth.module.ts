import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from '../customers/models/customer.model';
import { JwtModules } from '../jwt/jwt.module';
import { MailModule } from '../mail/mail.module';
import { Admin } from '../admin/models/admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer, Admin]),
    JwtModules,
    MailModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
