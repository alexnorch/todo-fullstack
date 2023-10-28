import { createRef } from "react";
import { TaskItem } from "../../../types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TodoItem } from "@components/todos";
import "./TodoList.scss";

const TodoList: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center">
        <p>Please create your first task</p>
      </div>
    );
  }

  return (
    <div className="task-wrapper">
      <TransitionGroup className="tasks" component="ul">
        {tasks.map((item) => {
          const nodeRef = createRef<HTMLElement | undefined>();

          return (
            <CSSTransition
              key={item._id}
              nodeRef={nodeRef}
              classNames="task"
              timeout={300}
            >
              <TodoItem ref={nodeRef} key={item._id} {...item} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;
