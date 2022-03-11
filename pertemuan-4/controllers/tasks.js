const TaskService = require('../services/tasks');

const getAllTasks = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();

    const tasks = await taskServiceInstance.getAll();
    res.status(200).json({
      success: true,
      data: {
        tasks,
        amount: tasks.length,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }  
};

const getTaskById = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();
    const { id } = req.params;

    const task = await taskServiceInstance.getById(id);
    
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error }); // untuk handle jika id nya tidak valid
  }
};

const createTask = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();
    const task = await taskServiceInstance.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }  
};  

const deleteTask = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();
    const { id } = req.params;
    
    const task = await taskServiceInstance.deleteById(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* metode patch */
const updateTask = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();
    const { id } = req.params;
    
    const task = await taskServiceInstance.updateById(id, req.body);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

/* metode put */
const editTask = async (req, res) => {
  try {
    const taskServiceInstance = new TaskService();
    const { id } = req.params;
    
    const task = await taskServiceInstance.editById(id, req.body);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask, editTask };