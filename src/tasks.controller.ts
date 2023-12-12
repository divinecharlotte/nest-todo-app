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
import { TasksService } from './tasks.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: any) {
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

    const newTask = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      categoryId: createTaskDto.categoryId,
    };

    return this.tasksService.createTask(newTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
