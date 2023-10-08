import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Customer } from '../../customers/models/customer.model';
import { Product } from '../../product/models/product.model';

interface BasketAttributes {
  name: string;
  description: string;
}
@Table({
  tableName: 'baskets',
})
export class Basket extends Model<Basket, BasketAttributes> {
  @ApiProperty({
    example: 1,
    description: 'basket id',
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
  @BelongsTo(() => Customer)
  customer: Customer;
  @BelongsTo(() => Product)
  product: Product;
}
