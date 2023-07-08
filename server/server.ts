import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 5000;

// Routes
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
