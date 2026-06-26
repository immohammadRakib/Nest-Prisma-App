import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsNotEmpty({ message: 'Category slug is required' })
  categorySlug!: string;
}
