import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('customers')
@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/auth/signup')
  register(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.register(createCustomerDto, res);
  }
  @Post('/auth/signin')
  onLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.onLogin(loginDto, res);
  }
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('/auth/logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter() refresh_token: string,
  ) {
    return this.customersService.logout(res, refresh_token);
  }
  @Get('user/activate/:id')
  activate(@Param('id') id: string) {
    return this.customersService.activateCustomer(id);
  }
  @Get('customers')
  @UseGuards(AdminGuard)
  findAll() {
    return this.customersService.findAll();
  }
  @Get('customers/:id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Put('customers/:id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete('customers/:id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
