const Task = require('../models/Task');

class TaskService {
  constructor() {
    this.taskModel = Task;
  }

  async getAll() {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getById(id) {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async create(data) {
    const task = await this.taskModel.create(data);
    return task;
  }

  async deleteById(id) {
    const task = await this.taskModel.findOneAndDelete({ _id: id });
    return task;
  }

  async updateById(id, data) {
    const task = await this.taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    return task;
  }

  async editById(id, data) {
    const task = await this.taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
      overwrite: true, // ini yang dibutuhkan untuk method put
    });
    return task;
  }
}

module.exports = TaskService;