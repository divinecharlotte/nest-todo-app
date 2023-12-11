import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    if (
      !createTaskDto.title ||
      !createTaskDto.description ||
      !createTaskDto.categoryId
    ) {
      throw new HttpException(
        'Invalid data. Please provide title, description, and category ID.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTask: Task = {
      id: '',
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
      categoryId: createTaskDto.categoryId,
    };

    return this.tasksService.createTask(newTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
