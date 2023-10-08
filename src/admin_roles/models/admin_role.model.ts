import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Roles } from '../../roles/models/role.model';
import { Admin } from '../../admin/models/admin.model';
interface AdminRoleAttributes {
  role_id: number;
  admin_id: number;
}
@Table({
  tableName: 'admin_roles',
  createdAt: false,
  updatedAt: false,
})
export class AdminRoles extends Model<AdminRoles, AdminRoleAttributes> {
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
    example: '1',
    description: 'role id',
  })
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;
  @ApiProperty({
    example: '2',
    description: 'admin_id',
  })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  admin_id: number;
  @BelongsTo(() => Roles)
  role: Roles;
  @BelongsTo(() => Admin)
  admin: Admin;
}
