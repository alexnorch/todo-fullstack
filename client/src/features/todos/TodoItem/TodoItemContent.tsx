import { forwardRef } from "react";
import { Checkbox, ActionsMenu } from "@features/ui";

interface ITodoItemContent {
  title: string;
  color: string;
  isCompleted: boolean;
  handleCheckTodo: () => void;
  onDeleting: () => void;
  onEditing: () => void;
}

const TodoItemContent = (
  {
    title,
    color,
    isCompleted,
    handleCheckTodo,
    onDeleting,
    onEditing,
  }: ITodoItemContent,
  ref: any
) => {
  const taskStyles = { borderLeft: `7px solid ${color}` };

  console.log("TodoItemContent", isCompleted);

  return (
    <li ref={ref} style={taskStyles} className="task">
      <div className="task__content">
        <div className="task__left">
          <Checkbox checked={isCompleted} onCheck={handleCheckTodo} />
          <p className="task__text">{title}</p>
        </div>
        <div className="task__right">
          <ActionsMenu onDelete={onDeleting} onEdit={onEditing} />
        </div>
      </div>
    </li>
  );
};

export default forwardRef<any, ITodoItemContent>(TodoItemContent);
