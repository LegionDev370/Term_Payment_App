import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: any,
  ) {
    return this.productService.create(createProductDto, file);
  }
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: any,
  ) {
    return this.productService.update(+id, updateProductDto, file);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
