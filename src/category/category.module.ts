import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Admin } from '../admin/models/admin.model';
import { AdminModule } from '../admin/admin.module';
import { JwtModules } from '../jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Admin]),
    AdminModule,
    JwtModules,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
