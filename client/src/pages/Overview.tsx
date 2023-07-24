import TodoItem from "../components/TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Overview = () => {
  const tasks = useSelector((state: RootState) => state.app.tasks);
  return (
    <div className="overview">
      <div className="heading">
        <h1>Welcome back Alexander Harashchenko</h1>
        <h2>Today is 24 June</h2>
      </div>
      <section className="overview__tasks">
        <h3>Today you have three tasks</h3>
        {tasks.map((item) => (
          <TodoItem key={item._id} {...item} />
        ))}
      </section>
    </div>
  );
};

export default Overview;
