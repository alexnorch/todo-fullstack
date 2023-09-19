import express from "express";
import authenticate from "../middlewares/authenticate";

// Controllers
import userController from "../controllers/userController";

const router = express.Router();

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);

router
  .route("/:id")
  .patch(
    authenticate,
    userController.uploadPhoto,
    userController.resizePhoto,
    userController.updateUser
  );

router
  .route("/changePassword")
  .post(authenticate, userController.changePassword);

router.route("/confirmEmail").post(authenticate, userController.confirmEmail);

export default router;
