import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Components
import TodoList from "../components/TodoList";
import NewTodo from "../components/NewTodo";

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.app.todos);
  const { category } = useParams();
  const filteredTasks = tasks.filter(
    (item) => item.category.title.toLocaleLowerCase() === category
  );

  return (
    <>
      {/* New page Tasks overview. This page will contain latest categories and latest tasks */}
      <NewTodo />
      <TodoList tasks={filteredTasks} />
    </>
  );
}
