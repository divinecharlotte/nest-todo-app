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
import { Category } from './category.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'all categories retrived succeefully.',
  })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'category retrived by id.',
  })
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: Category,
    description: 'Json structure for category object',
  })
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
  async deleteCategory(@Param('id') id: string) {
    await this.categoriesService.deleteCategory(id);
  }
}
