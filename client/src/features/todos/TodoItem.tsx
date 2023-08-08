import { useState } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import { TaskItem } from "./types";

// Redux
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/appSlice";
import { removeTodo, updateTodo } from "../../redux/appSlice";

// Components
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";

// Ideas:
// When user completes the task, it moved to completed section ""
//
//

const TodoItem: React.FC<TaskItem> = ({ _id, title, completed }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(title);
  const { authAxios } = useCustomAxios();
  const dispatch = useDispatch();

  const onEditBegin = () => setIsEditing(true);
  const onEditEnd = () => {
    if (userValue.trim().length > 6) {
      return setIsEditing(false);
    }

    dispatch(
      showAlert({ type: "danger", text: "Must be greater than 6 characters" })
    );
  };

  const onEditValue: React.KeyboardEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      if (event.keyCode === 13 && userValue.trim().length >= 6) {
        const { data } = await authAxios.patch(`/api/task/${_id}`, {
          title: userValue,
          completed,
        });
        setIsEditing(false);

        dispatch(updateTodo(data));
        dispatch(showAlert({ type: "success", text: "Successfully changed" }));
      } else if (event.keyCode === 13 && userValue.trim().length < 6) {
        dispatch(
          showAlert({
            type: "danger",
            text: "Must be greater than 6 characters",
          })
        );
      }
    } catch (error) {}
  };

  const onDeleteTask = async () => {
    try {
      const { data } = await authAxios.delete(`/api/task/${_id}`);
      dispatch(removeTodo(data));
    } catch (error) {}
  };

  const onUpdateTask = async () => {
    try {
      const { data } = await authAxios.patch(`/api/task/${_id}`, {
        title: userValue,
        completed: !completed,
      });

      dispatch(updateTodo(data));
    } catch (error) {}
  };

  const TodoContent = isEditing ? (
    <Input
      handleBlur={onEditEnd}
      onKeyUp={onEditValue}
      placeholder="Type a new title of task"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUserValue(e.target.value)
      }
      value={userValue}
    />
  ) : (
    <p onClick={onEditBegin} className="tasks__task__content__text">
      {userValue}
    </p>
  );

  return (
    <li className="tasks__task">
      <div className="tasks__task__content">
        <div className="tasks__task__content__left">
          <Checkbox checked={completed} onCheck={onUpdateTask} />
          {TodoContent}
        </div>
        <div className="tasks__task__content__right">
          <button className="tasks__task__delete" onClick={onDeleteTask}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
