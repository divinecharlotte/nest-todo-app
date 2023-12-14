import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { HttpException } from '@nestjs/common';

describe('TasksController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const result = tasksController.getAllTasks();
      expect(result).toBeDefined();
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = 'd6268327-76b2-4b4d-9b7b-c2da808ee7d7';
      const result = await tasksController.getTaskById(taskId);
      expect(result).toBeDefined();
    });

    it('should throw HttpException for invalid task ID', async () => {
      const invalidTaskId = 'invalidId';
      await expect(
        tasksController.getTaskById(invalidTaskId),
      ).rejects.toThrowError(HttpException);
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const createTaskDto = {
        title: 'New Task',
        description: 'Task Description',
        categoryId: '6a622d31-7410-4cc2-a29a-89a9fb78cfa2',
      };
      const result = tasksController.createTask(createTaskDto);
      expect(result).toBeDefined();
    });

    it('should throw HttpException for missing data', () => {
      const createTaskDto = {};
      expect(() => tasksController.createTask(createTaskDto)).toThrowError(
        HttpException,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', () => {
      const taskId = 'd6268327-76b2-4b4d-9b7b-c2da808ee7d7';
      const result = tasksController.deleteTask(taskId);
      expect(result).toBeUndefined();
    });
  });
});
