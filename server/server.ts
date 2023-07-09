import express from "express";
import "dotenv/config";
import { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 5000;

// Routes
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";
import categoryRouter from "./routes/categoryRouter";

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
