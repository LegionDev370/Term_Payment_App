import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { Customer } from '../customers/models/customer.model';
import { JwtModules } from '../jwt/jwt.module';

@Module({
  imports: [SequelizeModule.forFeature([Basket, Customer]), JwtModules],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
