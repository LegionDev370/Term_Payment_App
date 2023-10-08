import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface RoleAttributes {
  name: string;
  description: string;
}
@Table({
  tableName: 'roles',
})
export class Roles extends Model<Roles, RoleAttributes> {
  @ApiProperty({
    example: 1,
    description: 'role id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'admin',
    description: 'role name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    example: 'foydalanuvchi',
    description: 'foydalanuvchi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
