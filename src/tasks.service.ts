import { Injectable } from '@nestjs/common';
import * as JsonDB from 'node-json-db';
import * as Config from 'node-json-db/dist/lib/JsonDBConfig';

@Injectable()
export class TasksService {
  private db: JsonDB.JsonDB;

  constructor() {
    this.db = new JsonDB.JsonDB(
      new Config.Config('myTasksDB', true, false, '/'),
    );
  }

  getAllTasks() {
    return this.db.getData('/tasks');
  }

  getTaskById(id: string) {
    return this.db.getData(`/tasks/${id}`);
  }

  createTask(task: any) {
    const taskId = `/${task.id}`;
    this.db.push(`/tasks${taskId}`, task, true);
    return task;
  }

  deleteTask(id: string) {
    this.db.delete(`/tasks/${id}`);
  }
}
