import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as JsonDB from 'node-json-db';
import * as Config from 'node-json-db/dist/lib/JsonDBConfig';

@Injectable()
export class CategoriesService {
  private db: JsonDB.JsonDB;
  private c_db: JsonDB.JsonDB;

  constructor() {
    this.db = new JsonDB.JsonDB(
      new Config.Config('myCategoriesDB', true, false, '/'),
    );
    this.c_db = new JsonDB.JsonDB(
      new Config.Config('myTasksDB', true, false, '/'),
    );
  }

  getAllCategories() {
    return this.db.getData('/categories');
  }

  getCategoryById(id: string) {
    return this.db.getData(`/categories/${id}`);
  }

  createCategory(category: any) {
    this.db.push(`/categories[]`, category, true);
    return category;
  }

  async deleteCategory(id: string) {
    const categoryIDIndex = await this.c_db.getIndex(
      '/tasks',
      id,
      'categoryId',
    );
    if (categoryIDIndex >= 0)
      throw new ConflictException('this category have other tasks');
    const categoryIndex = await this.db.getIndex('/categories', id);

    if (categoryIndex < 0)
      throw new NotFoundException('categoryId does not exist');
    this.db.delete(`/categories[${categoryIndex}]`);

    return 'categoru is successfully deleted';
  }
}
