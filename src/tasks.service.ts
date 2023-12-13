import { Injectable, NotFoundException } from '@nestjs/common';
import * as JsonDB from 'node-json-db';
import * as Config from 'node-json-db/dist/lib/JsonDBConfig';

@Injectable()
export class TasksService {
  private db: JsonDB.JsonDB;
  private c_db: JsonDB.JsonDB;

  constructor() {
    this.db = new JsonDB.JsonDB(
      new Config.Config('myTasksDB', true, false, '/'),
    );
    this.c_db = new JsonDB.JsonDB(
      new Config.Config('myCategoriesDB', true, false, '/'),
    );
  }

  getAllTasks() {
    return this.db.getData('/tasks');
  }

  getTaskById(id: string) {
    return this.db.getData(`/tasks/${id}`);
  }

  async createTask(task: any) {
    const taskIndex = await this.c_db.getIndex(
      '/categories',
      task.categoryId,
      'id',
    );
    if (taskIndex < 0) throw new NotFoundException('CategoryId not Found.');
    this.db.push(`/tasks[]`, task, true);
    return task;
  }

  deleteTask(id: string) {
    this.db.delete(`/tasks/${id}`);
  }
}
