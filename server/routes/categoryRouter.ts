import express from "express";
import categoryController from "../controllers/categoryController";

const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .delete(categoryController.deleteCategory)
  .patch(categoryController.updateCategory);

export default router;
