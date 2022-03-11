const { expect } = require('@jest/globals');
const Task = require('../models/Task');
const TaskService = require('./tasks');

describe('Task service', () => { 
  const taskInput = {
    name: 'Demo soal',
    completed: false,
  }
  
  test('Create should return input data with id', async () => {
    const taskServiceInstance = new TaskService();

    Task.create = jest.fn().mockResolvedValue({
      _id: '71234234',
      ...taskInput
    });

    const result = await taskServiceInstance.create(taskInput);

    expect(Task.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      _id: expect.any(String),
      ...taskInput,
    });
  });

  test('Get all should return empty array if no data is present at database', async () => { 
    const taskServiceInstance = new TaskService();

    Task.find = jest.fn().mockResolvedValue([]);

    const result = await taskServiceInstance.getAll();
    expect(Task.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
   });
 });