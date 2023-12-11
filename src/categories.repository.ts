import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoriesRepository {
  private categories: Category[] = [];

  getAllCategories(): Category[] {
    return this.categories;
  }

  createCategory(category: Category): Category {
    this.categories.push(category);
    return category;
  }
}
