import { forwardRef, useEffect } from "react";
import { BsArrowReturnLeft, BsXLg } from "react-icons/bs";
import { TaskItem } from "../types";

// Hooks
import useTaskServices from "../useTodoServices";

interface CompletedTasksProps {
  tasks: TaskItem[];
  onToggle: () => void;
  isActive: boolean;
}

// Добавити пункт коли саме був виконаний таск
// На страниці Overview добавити позначку що таск виконаний (Checked icon)

const CompletedTasks = forwardRef<HTMLDivElement, CompletedTasksProps>(
  ({ tasks, isActive, onToggle }, ref) => {
    const { onUpdateTask } = useTaskServices();

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          ref &&
          "current" in ref &&
          ref.current &&
          !ref.current.contains(event.target as Node)
        ) {
          onToggle();
        }
      };

      if (isActive) {
        document.addEventListener("mousedown", handleOutsideClick);
      } else {
        document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isActive]);

    const completedTasks =
      tasks.length > 0 ? (
        tasks.map((item) => (
          <li key={item._id} className="completed-tasks__list__item">
            <p className="completed-tasks__list__item__text">{item.title}</p>
            <button
              onClick={() => onUpdateTask(item._id, item)}
              className="completed-tasks__list__item__btn"
            >
              <BsArrowReturnLeft />
            </button>
          </li>
        ))
      ) : (
        <p>No completed tasks to show</p>
      );

    return (
      isActive && (
        <div className="completed-tasks" ref={ref}>
          <div className="completed-tasks__top">
            <h2 className="completed-tasks__top__title">Completed tasks</h2>
            <button onClick={onToggle} className="completed-tasks__top__btn">
              <BsXLg />
            </button>
          </div>
          <ul className="completed-tasks__list">{completedTasks}</ul>
        </div>
      )
    );
  }
);

export default CompletedTasks;
