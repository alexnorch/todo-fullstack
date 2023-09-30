import express from "express";
import authenticate from "../middlewares/authenticate";

// Controllers
import userController from "../controllers/userController";

const router = express.Router();

router.route("/").get(authenticate, userController.getUser);

router.route("/login").post(userController.loginUser);

router.route("/register").post(userController.registerUser);

router.route("/profileDetails").patch(authenticate, userController.updateUser);

router
  .route("/profilePicture")
  .patch(
    authenticate,
    userController.uploadPhoto,
    userController.resizePhoto,
    userController.updateUserPhoto
  );

router
  .route("/changePassword")
  .post(authenticate, userController.changePassword);

router
  .route("/verificationEmail")
  .post(authenticate, userController.verificationEmail);

router.route("/confirmEmail").get(userController.confirmEmail);

export default router;
