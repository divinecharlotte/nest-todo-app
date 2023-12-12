import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
// import { HttpException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TasksService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    service = module.get<TasksService>(TasksService);
  });
  const Tasks = [
    {
      id: '4c963bf2-004f-42b4-b36f-ed90a9fe70dc',
      title: 'Task Title',
      description: 'Task Description',
      status: 'OPEN',
      categoryId: '0cd6b4b4-7885-45bb-a286-2f91bfac0b53',
    },
    {
      id: '8adbd4e9-5d4d-4976-bcd9-5a0fc8768dfa',
      title: 'string',
      description: 'string',
      status: 'string',
      categoryId: 'string',
    },
    {
      id: '72d7ac9c-5fd4-4f8e-84ee-47d8aafba101',
      title: 'string',
      description: 'string',
      status: 'string',
      categoryId: 'string',
    },
    {
      id: 'faf3f55a-0378-4c53-a240-d20b158dac09',
      title: 'string',
      description: 'string',
      status: 'string',
      categoryId: 'string',
    },
    {
      id: '5e8ba228-52dc-4952-88cb-d1156eb95b1a',
      title: 'string',
      description: 'string',
      status: 'string',
      categoryId: 'string',
    },
    {
      id: '18f4ad79-070b-4cf7-87b8-f59b11f05616',
      title: 'string',
      description: 'string',
      status: 'string',
      categoryId: 'string',
    },
  ];

  //   it('should add a task', async () => {
  //     const newTask = {
  //       id: '11',
  //       title: 'string',
  //       description: 'string',
  //       status: 'string',
  //       categoryId: 'string',
  //     };
  //     const expectedTasksResult = {
  //       categoryId: 'string',
  //       description: 'string',
  //       id: '11',
  //       status: 'string',
  //       title: 'string',
  //     };
  //     const result = await service.createTask(newTask);
  //     expect(result).toEqual(expectedTasksResult);
  //   });

  it('it should get all tasks', async () => {
    const result = await service.getAllTasks();
    console.log(result);

    expect([
      {
        id: '4c963bf2-004f-42b4-b36f-ed90a9fe70dc',
        title: 'Task Title',
        description: 'Task Description',
        status: 'OPEN',
        categoryId: '0cd6b4b4-7885-45bb-a286-2f91bfac0b53',
      },
      {
        id: '8adbd4e9-5d4d-4976-bcd9-5a0fc8768dfa',
        title: 'string',
        description: 'string',
        status: 'string',
        categoryId: 'string',
      },
      {
        id: '72d7ac9c-5fd4-4f8e-84ee-47d8aafba101',
        title: 'string',
        description: 'string',
        status: 'string',
        categoryId: 'string',
      },
      {
        id: 'faf3f55a-0378-4c53-a240-d20b158dac09',
        title: 'string',
        description: 'string',
        status: 'string',
        categoryId: 'string',
      },
      {
        id: '5e8ba228-52dc-4952-88cb-d1156eb95b1a',
        title: 'string',
        description: 'string',
        status: 'string',
        categoryId: 'string',
      },
      {
        id: '18f4ad79-070b-4cf7-87b8-f59b11f05616',
        title: 'string',
        description: 'string',
        status: 'string',
        categoryId: 'string',
      },
    ]).toEqual(Tasks);
  });
  it('should get a single task by id', async () => {
    const task = {
      categoryId: 'string',
      description: 'string',
      id: '11',
      status: 'string',
      title: 'string',
    };
    const result = await service.getTaskById(task.id);
    expect(result).toEqual(task);
  });
});
