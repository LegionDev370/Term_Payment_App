import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FilesService } from '../file/file.service';
import * as fs from 'fs';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepo: typeof Product,
    private readonly fileService: FilesService,
  ) {}
  async create(createProductDto: CreateProductDto, file: any) {
    const fileName = await this.fileService.createFile(file);
    const findProduct = await this.productRepo.findOne({
      where: {
        title: createProductDto.title,
      },
    });
    if (!findProduct) {
      const product = await this.productRepo.create({
        ...createProductDto,
        photo: fileName,
      });
      if (product) {
        return {
          message: 'Product created successfully',
          data: product,
        };
      }
    } else {
      throw new HttpException(
        'Product with this title already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const products = await this.productRepo.findAll({
      include: {
        all: true,
      },
    });
    if (products.length >= 1) {
      return {
        message: 'Products fetched successfully',
        data: products,
      };
    } else {
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    const product = await this.productRepo.findByPk(id);
    if (product) {
      return {
        message: 'Product fetched successfully',
        data: product,
      };
    } else {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto, file: any) {
    const findProduct = await this.productRepo.findByPk(id);
    fs.unlinkSync(`${process.cwd()}/dist/static/${findProduct.photo}`);
    console.log(findProduct);
    const fileName = await this.fileService.createFile(file);
    const updatedProduct = await this.productRepo
      .update(
        {
          title: updateProductDto.title,
          photo: fileName,
          description: updateProductDto.description,
          price: updateProductDto.price,
          count: updateProductDto.count,
          category_id: updateProductDto.category_id,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      )
      .then((result) => result[1][0]);

    if (updatedProduct) {
      return {
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    } else {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    const data = await this.productRepo.destroy({
      where: {
        id,
      },
    });
    if (data) {
      return {
        message: 'Product deleted successfully',
      };
    } else {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
