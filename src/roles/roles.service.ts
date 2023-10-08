import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './models/role.model';
import { AddRoleDto } from '../admin_roles/dto/add_role.dto';
import { AdminRoles } from '../admin_roles/models/admin_role.model';
@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private readonly roleRepo: typeof Roles,
    @InjectModel(AdminRoles) private readonly adminRoles: typeof AdminRoles,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const findRole = await this.roleRepo.findOne({
      where: {
        name: createRoleDto.name,
      },
    });
    if (!findRole) {
      const newRole = await this.roleRepo.create(createRoleDto);
      if (newRole) {
        return {
          message: 'Role Created Successfully',
          data: newRole,
        };
      }
    } else {
      throw new HttpException('Role Already Exists', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const roles = await this.roleRepo.findAll();
    if (roles.length >= 1) {
      return {
        message: 'Roles Found Successfully',
        data: roles,
      };
    }
    throw new HttpException('Roles Not Found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findByPk(id);
    if (!role) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Role Found Successfully',
      data: role,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleRepo
      .update(updateRoleDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((res) => res[1][0]);

    if (!updatedRole) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Role Updated Successfully',
      data: updatedRole,
    };
  }

  async remove(id: number) {
    const data = await this.roleRepo.destroy({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Role Deleted Successfully',
    };
  }
  async addRole(addRoleDto: AddRoleDto) {
    const findRole = await this.adminRoles.findOne({
      where: {
        admin_id: addRoleDto.admin_id,
      },
    });
    if (!findRole) {
      const role = await this.adminRoles.create(addRoleDto);
      if (role) {
        return {
          message: 'Role add Successfully',
        };
      }
    } else {
      throw new HttpException('Role already added', HttpStatus.BAD_REQUEST);
    }
  }
}
