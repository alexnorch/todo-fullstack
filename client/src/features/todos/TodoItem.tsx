import { useState } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import { TaskItem } from "./types";

// Redux
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/appSlice";
import { updateTodo } from "../../redux/appSlice";
import useTaskServices from "./useTaskServices";

// Components
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import TodoActions from "./TodoActions";

const TodoItem: React.FC<TaskItem> = ({ _id, title, completed, color }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(title);
  const { authAxios } = useCustomAxios();
  const { onUpdateTask, onDeleteTask } = useTaskServices();
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
    <p className="tasks__task__content__text">{userValue}</p>
  );

  return (
    <li style={{ borderLeft: `7px solid ${color}` }} className="tasks__task">
      <div className="tasks__task__content">
        <div className="tasks__task__content__left">
          <Checkbox
            checked={completed}
            onCheck={() => onUpdateTask(_id, { title, completed })}
          />
          {TodoContent}
        </div>
        <div className="tasks__task__content__right">
          <TodoActions
            onDelete={() => onDeleteTask(_id)}
            onChange={onEditBegin}
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
