import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { PayPurchaseDto } from './dto/pay-purchase.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('purchases')
@Controller()
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('purchases/create')
  @UseGuards(RolesGuard)
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get('purchases')
  @UseGuards(RolesGuard)
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get('purchases/:id')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(+id);
  }

  @Put('purchases/:id')
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  @Delete('purchases/:id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
  @Post('purchases/pay')
  @UseGuards(JwtAuthGuard)
  payPurchase(@Body() payPurchaseDto: PayPurchaseDto) {
    return this.purchasesService.payPurchase(payPurchaseDto);
  }
  @Get('purchases/all/histories')
  @UseGuards(AdminGuard)
  async findAllHistories() {
    return this.purchasesService.findAllHistories();
  }
}
