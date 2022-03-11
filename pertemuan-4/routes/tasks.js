const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  editTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/")
  .get(getAllTasks)
  .post(createTask);
router.route("/:id")
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

module.exports = router;