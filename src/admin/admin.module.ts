import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModules } from '../jwt/jwt.module';
import { PurchasesWrapper } from '../purchases-wrapper/models/purchases-wrapper.model';
@Module({
  imports: [SequelizeModule.forFeature([Admin, PurchasesWrapper]), JwtModules],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
