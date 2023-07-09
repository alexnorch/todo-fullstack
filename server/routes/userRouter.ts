import express from "express";

// Controllers
import userControllers from "../controllers/userControllers";

const router = express.Router();

router.route("/login").post(userControllers.loginUser);
router.route("/register").post(userControllers.registerUser);

router.route("/:id").patch(userControllers.updateUser);

export default router;
