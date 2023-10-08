import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Basket } from '../../basket/models/basket.model';

interface CustomerAttributes {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  birth_date: Date;
  email: string;
  password: string;
  address: string;
  activation_link: string;
  passport_info: string;
  hashed_refresh_token: string;
}

@Table({
  tableName: 'customers',
})
export class Customer extends Model<Customer, CustomerAttributes> {
  @ApiProperty({
    example: 1,
    description: 'customer id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'farik',
    description: 'first name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'last name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'username',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;
  @ApiProperty({
    example: '99890*****23',
    description: 'phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;
  @ApiProperty({
    example: '2000.12.05',
    description: 'birth date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birth_date: Date;
  @ApiProperty({
    example: '<EMAIL>',
    description: 'email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @ApiProperty({
    example: 'Dd3526352++',
    description: 'password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({
    example: 'adress',
    description: 'address',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
  @ApiProperty({
    example: 'Ab2526352',
    description: 'passport info',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passport_info: string;
  @ApiProperty({
    example: '<link>',
    description: 'activation link',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
  @ApiProperty({
    example: '<KEY>',
    description: 'hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @ApiProperty({
    example: 'true',
    description: 'is customer active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @BelongsToMany(() => Product, () => Basket)
  baskets: Product[];
}
