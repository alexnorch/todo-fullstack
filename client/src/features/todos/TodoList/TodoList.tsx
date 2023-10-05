import { TaskItem } from "../../../types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.scss";

const TodoList: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  const renderTaskItems = () => {
    return tasks.length > 0 ? (
      tasks.map((item) => <TodoItem key={item._id} {...item} />)
    ) : (
      <p>Please create your first task</p>
    );
  };

  return (
    <div className="task-wrapper">
      <ul className="tasks">{renderTaskItems()}</ul>
    </div>
  );
};

export default TodoList;
