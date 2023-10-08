import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Purchases } from '../../purchases/models/purchase.model';
interface HistoryAttributes {
  paying_date: Date;
  payment_method: string;
  amount: number;
  purchases_id: number;
}
@Table({
  tableName: 'histories',
})
export class History extends Model<History, HistoryAttributes> {
  @ApiProperty({
    example: 1,
    description: 'history id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: '2023-12-03',
    description: 'date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  paying_date: Date;
  @ApiProperty({
    example: 'credit card',
    description: 'payment method',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_method: string;
  @ApiProperty({
    example: 100,
    description: 'amount',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;
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
  @BelongsTo(() => Purchases)
  purchases: Purchases;
}
