import axios from "axios";

class TaskService {
  async addTask(title: string, category: string) {
    if (!title || !category) {
      const response = await axios.post("/api/task", { title, category });
      return response.data;
    }
  }
}

export default TaskService;
