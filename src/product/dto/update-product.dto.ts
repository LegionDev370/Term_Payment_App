import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  photo: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  price: number;
  @IsOptional()
  count: number;
  @IsOptional()
  category_id: number;
}
