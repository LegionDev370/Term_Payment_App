import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { Customer } from './models/customer.model';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/models/product.model';
@Injectable()
export class CustomersService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
  ) {}
  async register(createCustomerDto: CreateCustomerDto, res: Response) {
    const data = await this.authService.register(createCustomerDto, res);
    return data;
  }
  async onLogin(loginDto: LoginDto, res: Response) {
    const data = await this.authService.onLogin(loginDto, res);
    return data;
  }
  async logout(res: Response, refresh_token: string) {
    const data = await this.authService.logout(res, refresh_token);
    return data;
  }
  async activateCustomer(link: string) {
    if (!link) {
      throw new HttpException('link not found', HttpStatus.NOT_FOUND);
    }
    const updatedCustomer = await this.customerRepo
      .update(
        {
          is_active: true,
        },
        {
          where: {
            activation_link: link,
          },
          returning: true,
        },
      )
      .then((result) => result[1][0]);

    if (updatedCustomer) {
      return {
        message: 'User activated successfully',
      };
    }
  }
  async findAll() {
    const customers = await this.customerRepo.findAll({
      include: {
        all: true,
      },
    });
    if (customers.length >= 1) {
      return {
        message: 'Customers founds',
        data: customers,
      };
    }
    throw new HttpException('No customers found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findByPk(id, {
      include: {
        all: true,
      },
    });
    if (customer) {
      return {
        message: 'Customer found',
        data: customer,
      };
    }
    throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepo
      .update(updateCustomerDto, {
        where: {
          id: id,
        },
        returning: true,
      })
      .then((result) => result[1][0]);
    if (updatedCustomer) {
      return {
        message: 'Customer updated',
        data: updatedCustomer,
      };
    } else {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    const data = await this.customerRepo.destroy({
      where: {
        id,
      },
    });
    if (data) {
      return {
        message: 'Customer deleted',
      };
    }
    throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }
}
