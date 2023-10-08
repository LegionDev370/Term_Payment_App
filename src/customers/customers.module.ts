import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { AuthModule } from '../auth/auth.module';
import { JwtModules } from '../jwt/jwt.module';
import { Admin } from '../admin/models/admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer, Admin]),
    AuthModule,
    JwtModules,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
