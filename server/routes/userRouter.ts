import express from "express";
import authenticate from "../middlewares/authenticate";

// Controllers
import userControllers from "../controllers/userControllers";

const router = express.Router();

router.route("/login").post(userControllers.loginUser);
router.route("/register").post(userControllers.registerUser);
router.route("/:id").patch(userControllers.updateUser);

router
  .route("/changePassword")
  .post(authenticate, userControllers.changePassword);

router.route("/confirmEmail").post(authenticate, userControllers.confirmEmail);

export default router;
