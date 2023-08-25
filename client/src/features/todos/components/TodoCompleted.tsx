import { useRef } from "react";
import { BsArrowReturnLeft, BsXLg } from "react-icons/bs";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { CSSTransition } from "react-transition-group";
import { CompletedTasksProps } from "../types";

// Hooks
import useTaskServices from "../useTodoServices";

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  isActive,
  onToggle,
}) => {
  const { onUpdateTask } = useTaskServices();
  const nodeRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ isShown: isActive, onHide: onToggle, nodeRef });

  const completedTasks = tasks?.map((item) => (
    <li key={item._id} className="completed-tasks__list__item">
      <p className="completed-tasks__list__item__text">{item.title}</p>
      <button
        onClick={() => onUpdateTask(item._id, item)}
        className="completed-tasks__list__item__btn"
      >
        <BsArrowReturnLeft />
      </button>
    </li>
  ));

  return (
    <CSSTransition
      unmountOnExit
      timeout={1000}
      in={isActive}
      classNames="completed-tasks"
      nodeRef={nodeRef}
    >
      <>
        {isActive ? (
          <div className="completed-tasks" ref={nodeRef}>
            <div className="completed-tasks__top">
              <h2 className="completed-tasks__top__title">Completed tasks</h2>
              <button onClick={onToggle} className="completed-tasks__top__btn">
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

export default CompletedTasks;
