import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { jwtService } from '../jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: jwtService,
  ) {}
  async create(createAdminDto: CreateAdminDto, res: Response) {
    const findAdmin = await this.adminRepo.findOne({
      where: {
        username: createAdminDto.username,
      },
    });
    if (!findAdmin) {
      try {
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 12);
        const admin = {
          ...createAdminDto,
          password: hashedPassword,
        };
        const newAdmin = await this.adminRepo.create(admin);
        const { refresh_token } = await this.jwtService.generateToken({
          id: newAdmin.id,
          is_active: false,
        });
        const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
        const updateAdmin = await this.adminRepo
          .update(
            {
              hashed_refresh_token,
              is_active: true,
            },
            {
              where: {
                id: newAdmin.id,
              },
              returning: true,
            },
          )
          .then((result) => result[1][0]);
        if (updateAdmin) {
          return {
            message: 'Admin Created Successfully',
            data: updateAdmin,
          };
        } else {
          throw new HttpException(
            'INTERNAL SERVER ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } catch (error) {
        throw new HttpException(
          {
            message: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const admins = await this.adminRepo.findAll({
      include: {
        all: true,
      },
    });
    if (admins.length >= 1) {
      return {
        message: 'All Admins',
        data: admins,
      };
    }
    throw new HttpException('No Admins', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findByPk(id, {
      include: {
        all: true,
      },
    });
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Admin found',
      data: admin,
    };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepo
      .update(updateAdminDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((result) => result[1][0]);
    if (!updatedAdmin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Admin updated',
      data: updatedAdmin,
    };
  }

  async remove(id: number) {
    const data = await this.adminRepo.destroy({
      where: {
        id,
      },
    });
    if (!data) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Admin deleted',
    };
  }
}
