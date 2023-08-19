import { useState, useRef } from "react";
import { TaskItem } from "./types";
import { CSSTransition } from "react-transition-group";

import useTaskServices from "./useTodoServices";

// Components
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import TodoActions from "./TodoActions";
import { Modal } from "../ui";

const TodoItem: React.FC<TaskItem> = ({ _id, title, completed, color }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(title);
  const [isDeletingTask, setIsDeletingTask] = useState<boolean>(false);
  const { onUpdateTask, onDeleteTask, onCompleteTask } = useTaskServices();
  const nodeRef = useRef<HTMLDivElement>(null);

  const onEditBegin = () => setIsEditing(true);
  const onEditEnd = () => setIsEditing(false);

  const TodoContent = isEditing ? (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        onUpdateTask(_id, { title: userValue, completed }, onEditEnd);
      }}
    >
      <Input
        placeholder="Type a new title of task"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserValue(e.target.value)
        }
        value={userValue}
      />
    </form>
  ) : (
    <p className="tasks__task__content__text">{userValue}</p>
  );

  return (
    <>
      <li style={{ borderLeft: `7px solid ${color}` }} className="tasks__task">
        <div className="tasks__task__content">
          <div className="tasks__task__content__left">
            <Checkbox
              checked={completed}
              onCheck={() => onCompleteTask(_id, { title, completed })}
            />
            {TodoContent}
          </div>
          <div className="tasks__task__content__right">
            <TodoActions
              onRemove={() => setIsDeletingTask(true)}
              onEdit={onEditBegin}
            />
          </div>
        </div>
      </li>
      <CSSTransition
        nodeRef={nodeRef}
        in={isDeletingTask}
        classNames="fade-up"
        timeout={500}
      >
        <Modal
          ref={nodeRef}
          submitter={() => onDeleteTask(_id)}
          onToggle={() => setIsDeletingTask((prev) => !prev)}
          isOpen={isDeletingTask}
          title="Are your sure you want to delete this task?"
        >
          <p>
            This will be delete this task permanently. You cannot undo this
            action.
          </p>
        </Modal>
      </CSSTransition>
    </>
  );
};

export default TodoItem;
