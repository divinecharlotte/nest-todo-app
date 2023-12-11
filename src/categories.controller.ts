import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(): Category[] {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  createCategory(@Body() category: Category): Category {
    return this.categoriesService.createCategory(category);
  }
}
