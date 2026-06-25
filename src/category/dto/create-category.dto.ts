import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  @MinLength(3, { message: 'Category name must be at least 3 characters long' })
  name!: string; 

  @IsString()
  @IsOptional()
  description?: string; 
}
