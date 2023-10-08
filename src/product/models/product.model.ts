import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
interface ProductAttributes {
  title: string;
  photo: string;
  description: string;
  price: number;
  count: number;
  category_id: number;
}
@Table({
  tableName: 'products',
})
export class Product extends Model<Product, ProductAttributes> {
  @ApiProperty({
    example: 1,
    description: 'product id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'cherry',
    description: 'title',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @ApiProperty({
    example: 'cherry',
    description: 'photo',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;
  @ApiProperty({
    example: 'cherry',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;
  @ApiProperty({
    example: 'cherry',
    description: 'price',
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;
  @ApiProperty({
    example: 'cherry',
    description: 'count',
  })
  @Column({
    type: DataType.INTEGER,
  })
  count: number;
  @ApiProperty({
    example: '1',
    description: 'category_id',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category[];
}
