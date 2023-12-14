import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = new TasksService();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = await tasksService.getAllTasks();

      expect(Array.isArray(tasks)).toBe(true);
    });
  });

  // TASK BY ID
  describe('getTaskById', () => {
    it('should return the task with the provided ID', async () => {
      expect(
        (await tasksService.getTaskById('d6268327-76b2-4b4d-9b7b-c2da808ee7d7'))
          .id,
      ).toEqual('d6268327-76b2-4b4d-9b7b-c2da808ee7d7');
    });

    it('should throw NotFoundException if task with given ID is not found', async () => {
      await expect(
        tasksService.getTaskById('nonExistentId'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  //  CREATE TASK
  describe('createTask', () => {
    it('should create a new task and return it', async () => {
      const newTask = {
        id: '2',
        name: 'New Task',
        categoryId: '6a622d31-7410-4cc2-a29a-89a9fb78cfa2',
      };
      expect((await tasksService.createTask(newTask)).id).toEqual(newTask.id);
    });

    it('should throw NotFoundException if categoryId is not found', async () => {
      const newTask = {
        id: '3',
        name: 'Task without Category',
        categoryId: 'invalidCategoryId',
      };
      await expect(tasksService.createTask(newTask)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete the task with the provided ID', () => {
      const taskId = '1';
      tasksService.createTask({
        id: taskId,
        name: 'Task to Delete',
        categoryId: 'categoryId',
      });

      tasksService.deleteTask('d6268327-76b2-4b4d-9b7b-c2da808ee7d7');
      expect(() =>
        tasksService.getTaskById('d6268327-76b2-4b4d-9b7b-c2da808ee7d7'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
