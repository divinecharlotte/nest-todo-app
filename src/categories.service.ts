import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getAllCategories(): Category[] {
    return this.categoriesRepository.getAllCategories();
  }

  createCategory(category: Category): Category {
    return this.categoriesRepository.createCategory(category);
  }
}
