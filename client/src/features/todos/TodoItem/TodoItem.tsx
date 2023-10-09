import { useState, forwardRef, Ref } from "react";
import { TaskItem } from "../types";
import { ChangeEvent } from "../../../types";
import "./TodoItem.scss";

import {
  useTodoServices,
  TodoItemContent,
  TodoItemDeleting,
  TodoItemEditing,
} from "@features/todos";

const TodoItem = (props: TaskItem, ref: Ref<any>) => {
  const { _id, title, completed, color } = props;
  const { onUpdateTask, onDeleteTask, onCompleteTask } = useTodoServices();

  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const onEditingToggle = () => setIsEditing(!isEditing);
  const onDeletingToggle = () => setIsDeleting(!isDeleting);
  const onChangeTitle = (e: ChangeEvent) => setNewTitle(e.target.value);

  const handleEditTodo = () => {
    onUpdateTask(_id, { title: newTitle, completed });
    setIsEditing(false);
  };

  const handleCheckTodo = () => {
    onCompleteTask(_id, { title, completed });
    setIsCompleted((prevState) => !prevState);
  };

  const handleDeleteTodo = () => {
    onDeleteTask(_id);
    setIsDeleting(false);
  };

  return (
    <>
      <TodoItemContent
        ref={ref}
        title={title}
        isCompleted={isCompleted}
        color={color}
        handleCheckTodo={handleCheckTodo}
        onDeleting={onDeletingToggle}
        onEditing={onEditingToggle}
      />

      <TodoItemDeleting
        isDeleting={isDeleting}
        onDeleteTodo={handleDeleteTodo}
        onDeletingToggle={onDeletingToggle}
      />

      <TodoItemEditing
        onChange={onChangeTitle}
        onTodoEdit={handleEditTodo}
        onToggle={onEditingToggle}
        isEditing={isEditing}
        value={newTitle}
      />
    </>
  );
};

export default forwardRef<any, TaskItem>(TodoItem);
