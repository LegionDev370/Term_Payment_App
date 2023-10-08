import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Customer } from '../../customers/models/customer.model';
import { Admin } from '../../admin/models/admin.model';
import { Purchases } from '../../purchases/models/purchase.model';
interface PurchasesAttributes {
  customer_id: number;
  product_id: number;
  admin_id: number;
}
@Table({
  tableName: 'purchases_wrapper',
})
export class PurchasesWrapper extends Model<
  PurchasesWrapper,
  PurchasesAttributes
> {
  @ApiProperty({
    example: 1,
    description: 'purchases id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: '1',
    description: 'customer id',
  })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;
  @ApiProperty({
    example: '1',
    description: 'product id',
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @ApiProperty({
    example: 1,
    description: 'admin id',
  })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  admin_id: number;
  @ApiProperty({
    example: 1,
    description: 'purchases id',
  })
  @ForeignKey(() => Purchases)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  purchases_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;
  @BelongsTo(() => Product)
  product: Product;
  @BelongsTo(() => Admin)
  admin: Admin;
  @BelongsTo(() => Purchases)
  purchases: Purchases;
}
