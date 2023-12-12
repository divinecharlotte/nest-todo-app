import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { v4 as uuidv4 } from 'uuid';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: any) {
    if (!createCategoryDto.name) {
      throw new HttpException(
        'Invalid data. Please provide a name for the category.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCategory = {
      id: uuidv4(),
      name: createCategoryDto.name,
    };

    return this.categoriesService.createCategory(newCategory);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    this.categoriesService.deleteCategory(id);
  }
}
