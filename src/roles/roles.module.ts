import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './models/role.model';
import { AdminRoles } from '../admin_roles/models/admin_role.model';
import { JwtModules } from '../jwt/jwt.module';
import { Admin } from '../admin/models/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Roles, AdminRoles, Admin]), JwtModules],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
