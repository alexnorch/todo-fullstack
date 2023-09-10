import { useState } from "react";
import { TaskItem } from "../types";
import { FormEvent, ChangeEvent } from "../../../types";
import "./TodoItem.scss";

import useTaskServices from "../useTodoServices";

// Components
import Checkbox from "@features/ui/Checkbox/Checkbox";
import Input from "@features/ui/Input/Input";
import ActionsMenu from "@features/ui/ActionsMenu/ActionsMenu";
import { Modal } from "@features/ui";

const TodoItem: React.FC<TaskItem> = ({ _id, title, completed, color }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(title);
  const [isDeletingTask, setIsDeletingTask] = useState<boolean>(false);
  const { onUpdateTask, onDeleteTask, onCompleteTask } = useTaskServices();

  const onEditBegin = () => setIsEditing(true);
  const onEditEnd = () => setIsEditing(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdateTask(_id, { title: userValue, completed }, onEditEnd);
  };

  const handleInputChange = (e: ChangeEvent) => {
    setUserValue(e.target.value);
  };

  const TodoContent = isEditing ? (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Type a new title of task"
        onChange={handleInputChange}
        value={userValue}
      />
    </form>
  ) : (
    <p className="task__text">{userValue}</p>
  );

  return (
    <>
      <li style={{ borderLeft: `7px solid ${color}` }} className="task">
        <div className="task__content">
          <div className="task__left">
            <Checkbox
              checked={completed}
              onCheck={() => onCompleteTask(_id, { title, completed })}
            />
            {TodoContent}
          </div>
          <div className="task__right">
            <ActionsMenu
              onDelete={() => setIsDeletingTask(true)}
              onEdit={onEditBegin}
            />
          </div>
        </div>
      </li>
      <Modal
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
    </>
  );
};

export default TodoItem;
