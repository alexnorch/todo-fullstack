import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Components
import TodoList from "../components/TodoList";
import NewTodo from "../components/NewTodo";

export default function Tasks() {
  const userData = useSelector((state: RootState) => state.app.data);
  const { category } = useParams();
  const filteredData = userData.filter(
    (item) => item.categoryName === category
  )[0];

  return (
    <>
      {/* New page Tasks overview. This page will contain latest categories and latest tasks */}
      <NewTodo />
      <TodoList tasks={filteredData.tasks} />
    </>
  );
}
