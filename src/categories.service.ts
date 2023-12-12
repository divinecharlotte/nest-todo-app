import { Injectable } from '@nestjs/common';
import * as JsonDB from 'node-json-db';
import * as Config from 'node-json-db/dist/lib/JsonDBConfig';

@Injectable()
export class CategoriesService {
  private db: JsonDB.JsonDB;

  constructor() {
    this.db = new JsonDB.JsonDB(
      new Config.Config('myCategoriesDB', true, false, '/'),
    );
  }

  getAllCategories() {
    return this.db.getData('/categories');
  }

  getCategoryById(id: string) {
    return this.db.getData(`/categories/${id}`);
  }

  createCategory(category: any) {
    const categoryId = `/${category.id}`;
    this.db.push(`/categories${categoryId}`, category, true);
    return category;
  }

  deleteCategory(id: string) {
    this.db.delete(`/categories/${id}`);
  }
}
