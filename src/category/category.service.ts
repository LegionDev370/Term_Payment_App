import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoryRepo.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (!findCategory) {
      const newCategory = await this.categoryRepo.create(createCategoryDto);
      if (newCategory) {
        return {
          message: 'Category Created Successfully',
          data: newCategory,
        };
      }
    }
    throw new HttpException('category already exists', HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const categories = await this.categoryRepo.findAll({
      include: {
        all: true,
      },
    });
    if (categories.length >= 1) {
      return {
        message: 'Categories Found Successfully',
        data: categories,
      };
    }
    throw new HttpException('No Categories Found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: {
        id,
      },
      include: {
        all: true,
      },
    });
    if (category) {
      return {
        message: 'Category Found Successfully',
        data: category,
      };
    } else {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepo
      .update(updateCategoryDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((result) => result[1][0]);
    if (updatedCategory) {
      return {
        message: 'Category Updated Successfully',
        data: updatedCategory,
      };
    } else {
      throw new HttpException('Category Not Updated', HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: number) {
    const data = await this.categoryRepo.destroy({
      where: {
        id,
      },
    });
    if (data) {
      return {
        message: 'Category Deleted Successfully',
      };
    } else {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
