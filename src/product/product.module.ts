import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FileModule } from '../file/file.module';
import { Admin } from '../admin/models/admin.model';
import { AdminModule } from '../admin/admin.module';
import { JwtModules } from '../jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Admin]),
    FileModule,
    AdminModule,
    JwtModules
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
