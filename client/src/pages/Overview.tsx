import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskItem } from "../types";
import { addZeroToNumber } from "../helpers";
import { TodoItemReadOnly } from "../features/todos";

const Overview = () => {
  const { data, user } = useSelector((state: RootState) => state.app);
  const allTasks: TaskItem[] = data.flatMap(({ tasks }) => tasks);

  const completedTasks = allTasks.filter((task) => task.completed);
  const uncompletedTasks = allTasks.filter((task) => !task.completed);
  const todoItems = allTasks.map((task) => (
    <TodoItemReadOnly key={task._id} {...task} />
  ));

  return (
    <div className="overview">
      <div className="overview-heading">
        <h1>Hello {user!.name}</h1>
        <h2>Today is 24 June</h2>
      </div>
      <section className="overview-cards">
        <div className="overview-card">
          <p className="overview-card__text">
            {addZeroToNumber(allTasks.length)}
          </p>
          <h3 className="overview-card__heading">All tasks</h3>
        </div>
        <div className="overview-card">
          <p className="overview-card__text">
            {addZeroToNumber(completedTasks.length)}
          </p>
          <h3 className="overview-card__heading">Completed tasks</h3>
        </div>
        <div className="overview-card">
          <p className="overview-card__text">
            {addZeroToNumber(uncompletedTasks.length)}
          </p>
          <h3 className="overview-card__heading">Uncompleted tasks</h3>
        </div>
      </section>
      <section className="overview-tasks">
        <h2 className="overview-tasks__heading">All tasks:</h2>
        <div className="overview-tasks__container">{todoItems}</div>
      </section>
    </div>
  );
};

export default Overview;
