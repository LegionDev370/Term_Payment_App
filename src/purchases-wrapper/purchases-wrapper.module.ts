import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasesWrapper } from './models/purchases-wrapper.model';
import { Product } from '../product/models/product.model';
import { ProductModule } from '../product/product.module';
import { Customer } from '../customers/models/customer.model';
import { Admin } from '../admin/models/admin.model';
import { Purchases } from '../purchases/models/purchase.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PurchasesWrapper,
      Product,
      Customer,
      Admin,
      Purchases,
    ]),
    ProductModule,
  ],
})
export class PurchasesModule {}
