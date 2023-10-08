import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Customer } from '../../customers/models/customer.model';
import { Admin } from '../../admin/models/admin.model';
import { PurchasesWrapper } from '../../purchases-wrapper/models/purchases-wrapper.model';
import { History } from '../../history/models/history.model';
interface PurchasesAttributes {
  purchase_date: Date;
  total_amount: number;
  interestRate: number;
  installmentDuration: number;
  status: boolean;
}
@Table({
  tableName: 'purchases',
})
export class Purchases extends Model<Purchases, PurchasesAttributes> {
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
    example: new Date(),
    description: 'purchase date',
  })
  @Column({
    type: DataType.DATE,
  })
  purchase_date: Date;
  @ApiProperty({
    example: 100,
    description: 'total amount',
  })
  @Column({
    type: DataType.INTEGER,
  })
  total_amount: number;
  @ApiProperty({
    example: 3,
    description: 'interest Rate',
  })
  @Column({
    type: DataType.INTEGER,
  })
  interestRate: number;
  @ApiProperty({
    example: 3,
    description: 'installment duration',
  })
  @Column({
    type: DataType.INTEGER,
  })
  installmentDuration: number;
  @ApiProperty({
    example: true,
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
  @ApiProperty({
    example: true,
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_paid: boolean;
  @BelongsToMany(() => Customer, () => PurchasesWrapper)
  customer: Customer;
  @BelongsToMany(() => Product, () => PurchasesWrapper)
  product: Product;
  @BelongsToMany(() => Admin, () => PurchasesWrapper)
  admin: Admin;
  @HasMany(() => History)
  histories: History[];
}
