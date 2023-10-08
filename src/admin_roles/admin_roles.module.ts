import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminRoles } from './models/admin_role.model';

@Module({
  imports: [SequelizeModule.forFeature([AdminRoles])],
})
export class AdminRolesModule {}
