import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getAllTasks(): Task[] {
    return this.tasksRepository.getAllTasks();
  }

  getTaskById(id: string): Task {
    return this.tasksRepository.getTaskById(id);
  }

  createTask(task: Task): Task {
    return this.tasksRepository.createTask(task);
  }

  deleteTask(id: string): void {
    this.tasksRepository.deleteTask(id);
  }
}
