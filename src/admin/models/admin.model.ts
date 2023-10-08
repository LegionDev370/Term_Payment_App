import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

interface AdminAttributes {
  username: string;
  password: string;
  telegram_link: string;
  admin_photo: string;
  is_active: boolean;
  hashed_refresh_token: string;
}
import { Roles } from '../../roles/models/role.model';
import { AdminRoles } from '../../admin_roles/models/admin_role.model';
import { Purchases } from '../../purchases/models/purchase.model';
import { PurchasesWrapper } from '../../purchases-wrapper/models/purchases-wrapper.model';
import { Customer } from '../../customers/models/customer.model';
@Table({
  tableName: 'admins',
})
export class Admin extends Model<Admin, AdminAttributes> {
  @ApiProperty({
    example: 1,
    description: 'admin id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
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
    example: 'ssss5555',
    description: 'password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
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
    example: '<IsActive>',
    description: 'is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @ApiProperty({
    example: '<HASHED REFRESH TOKEN>',
    description: 'token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @BelongsToMany(() => Roles, () => AdminRoles)
  roles: Roles[];
  @BelongsToMany(() => Purchases, () => PurchasesWrapper)
  purchases: Purchases[];
}
