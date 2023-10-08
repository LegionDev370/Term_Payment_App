import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Purchases } from './models/purchase.model';
import { Product } from '../product/models/product.model';
import { ProductModule } from '../product/product.module';
import { PurchasesWrapper } from '../purchases-wrapper/models/purchases-wrapper.model';
import { JwtModules } from '../jwt/jwt.module';
import { Admin } from '../admin/models/admin.model';
import { History } from '../history/models/history.model';
import { Sequelize } from 'sequelize-typescript';
@Module({
  imports: [
    SequelizeModule.forFeature([
      Purchases,
      Product,
      PurchasesWrapper,
      Admin,
      History,
    ]),
    ProductModule,
    JwtModules,
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
