import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { Customer } from '../customers/models/customer.model';
import { Request } from 'express';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private readonly basketRepo: typeof Basket,
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
  ) {}
  async create(createBasketDto: CreateBasketDto) {
    const basket = await this.basketRepo.create(createBasketDto);
    if (basket) {
      return {
        message: 'success',
      };
    }
  }
  async findAll(req: Request) {
    const user_id = req['user'].id;
    const findCustomer = await this.customerRepo.findByPk(user_id, {
      include: {
        all: true,
      },
    });
    const basket = findCustomer.baskets;
    return {
      message: 'success',
      basket,
    };
  }
}
