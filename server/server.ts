import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/AppError";

const app = express();

// Routes
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";
import categoryRouter from "./routes/categoryRouter";

// Middlewares
import authenticate from "./middlewares/authenticate";

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/task", authenticate, taskRouter);
app.use("/api/category", authenticate, categoryRouter);
app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Error Handlings

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("There is no such route", 404));
});

app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
    const message =
      err.message || "Something went wrong, please try again later";

    res.status(statusCode).json({ message });
  }
);

const todoSetup = () => {
  const mongoURL = process.env.MONGO_URL || "";
  const PORT = process.env.PORT || 5000;

  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Successfully connected to the database");

      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    })
    .catch((err) => console.log(err));
};

todoSetup();
