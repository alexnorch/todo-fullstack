import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskItem } from "../types";

const Overview = () => {
  const { data, user } = useSelector((state: RootState) => state.app);
  const allTasks: TaskItem[] = data.flatMap(({ tasks }) => tasks);

  const completedTasks = allTasks.filter((task) => task.completed);
  const uncompletedTasks = allTasks.filter((task) => !task.completed);

  return (
    <div className="overview">
      <div className="heading">
        <h1>Hello {user!.name}</h1>
        <h2>Today is 24 June</h2>
      </div>
      <section className="overview__tasks">
        <h3>Today you have completed {completedTasks.length} tasks</h3>
      </section>
    </div>
  );
};

export default Overview;
