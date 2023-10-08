import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { Request } from 'express';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.create(createBasketDto);
  }
  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req()
    req: Request,
  ) {
    return this.basketService.findAll(req);
  }
}
