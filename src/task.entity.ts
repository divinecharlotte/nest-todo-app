import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './task-status.enum';

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;

  constructor(title: string, description: string, categoryId: string) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
    this.categoryId = categoryId;
  }
}
