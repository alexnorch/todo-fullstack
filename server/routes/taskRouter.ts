import express from "express";
import taskController from "../controllers/taskController";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router
  .route("/:id")
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
