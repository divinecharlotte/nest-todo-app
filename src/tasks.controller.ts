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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './task.entity';
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'all tasks retrived succeefully.',
  })
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'task retrived succeefully.',
  })
  getTaskById(@Param('id') id: string) {
    if (!id) {
      return this.tasksService.getTaskById(id);
    }
    return 'ID does not exist';
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: Task,
    description: 'Json structure for task object',
  })
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

    console.log(newTask);
    return this.tasksService.createTask(newTask);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: `The task with has been successfully deleted.`,
  })
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
