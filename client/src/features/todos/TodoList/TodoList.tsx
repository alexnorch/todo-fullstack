import { useEffect, useRef } from "react";
import { TaskItem } from "../../../types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.scss";

const TodoList: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  const contentRef = useRef<HTMLUListElement>(null);
  const scrollBar = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const renderTaskItems = () => {
    return tasks.length > 0 ? (
      tasks.map((item) => <TodoItem key={item._id} {...item} />)
    ) : (
      <p>Please create your first task</p>
    );
  };

  return (
    <div className="task-wrapper">
      <div ref={scrollBar} className="task-wrapper__scrollbar">
        <div ref={thumbRef} className="task-wrapper__thumb"></div>
      </div>
      <ul ref={contentRef} className="tasks">
        {renderTaskItems()}
      </ul>
    </div>
  );
};

export default TodoList;
