import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { BsArrowReturnLeft, BsXLg } from "react-icons/bs";
import "./TodoCompleted.scss";

import useOutsideClick from "@hooks/useOutsideClick";
import { CompletedTasksProps } from "../types";

// Hooks
import useTaskServices from "../useTodoServices";

const TodoCompleted: React.FC<CompletedTasksProps> = ({
  isShown,
  onToggle,
  tasks,
}) => {
  const { onCompleteTask } = useTaskServices();
  const nodeRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ isShown, onHide: onToggle, nodeRef });

  const completedTasks = tasks?.map((item) => (
    <li key={item._id} className="completed-tasks__item">
      <p className="completed-tasks__text">{item.title}</p>
      <button
        onClick={() => onCompleteTask(item._id, item)}
        className="completed-tasks__btn"
      >
        <BsArrowReturnLeft />
      </button>
    </li>
  ));

  return (
    <CSSTransition
      unmountOnExit
      timeout={1000}
      in={isShown}
      classNames="completed-tasks"
      nodeRef={nodeRef}
    >
      <>
        {isShown ? (
          <div className="completed-tasks" ref={nodeRef}>
            <div className="completed-tasks__top">
              <h2 className="completed-tasks__title">Completed tasks</h2>
              <button onClick={onToggle} className="completed-tasks__btn">
                <BsXLg />
              </button>
            </div>
            <ul className="completed-tasks__list">
              {completedTasks}
              {!completedTasks.length && <p>No completed task to show</p>}
            </ul>
          </div>
        ) : null}
      </>
    </CSSTransition>
  );
};

export default TodoCompleted;
