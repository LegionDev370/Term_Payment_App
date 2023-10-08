import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
interface CategoryAttributes {
  name: string;
  description: string;
}
@Table({
  tableName: 'categories',
})
export class Category extends Model<Category, CategoryAttributes> {
  @ApiProperty({
    example: 1,
    description: 'category id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'laptops',
    description: 'laptop name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @HasMany(() => Product)
  products: Product[];
}
