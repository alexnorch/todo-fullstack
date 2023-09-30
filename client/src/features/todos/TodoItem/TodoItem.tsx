import { useState } from "react";
import { TaskItem } from "../types";
import { ChangeEvent } from "../../../types";
import "./TodoItem.scss";

import { useTodoServices, TodoEditing } from "@features/todos";

// Components
import {
  ConfirmDialog,
  Modal,
  TextField,
  Checkbox,
  ActionsMenu,
} from "@features/ui";

const TodoItem: React.FC<TaskItem> = ({ _id, title, completed, color }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [isDeletingTask, setIsDeletingTask] = useState<boolean>(false);

  const { onUpdateTask, onDeleteTask, onCompleteTask } = useTodoServices();

  const onEditBegin = () => setIsEditing(true);
  const onEditToggle = () => setIsEditing((prev) => !prev);
  const onComplete = () => onCompleteTask(_id, { title, completed });
  const onDeleteStart = () => setIsDeletingTask(true);

  const onEditTodo = () => {
    onUpdateTask(_id, { title: newTitle, completed });
    setIsEditing(false);
  };

  const taskStyles = { borderLeft: `7px solid ${color}` };

  return (
    <>
      <li style={taskStyles} className="task">
        <div className="task__content">
          <div className="task__left">
            <Checkbox checked={completed} onCheck={onComplete} />
            <p className="task__text">{title}</p>
          </div>
          <div className="task__right">
            <ActionsMenu onDelete={onDeleteStart} onEdit={onEditBegin} />
          </div>
        </div>
      </li>

      <ConfirmDialog
        submitter={() => onDeleteTask(_id)}
        isOpen={isDeletingTask}
        onToggle={() => setIsDeletingTask((prev) => !prev)}
        text="Are you sure you want to delete this task?"
      />

      <TodoEditing
        onChange={(e: ChangeEvent) => setNewTitle(e.target.value)}
        onTodoEdit={onEditTodo}
        onToggle={onEditToggle}
        isEditing={isEditing}
        value={newTitle}
      />
    </>
  );
};

export default TodoItem;
