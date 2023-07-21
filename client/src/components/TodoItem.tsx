import { useState } from "react";
import useCustomAxios from "../hooks/useCustomAxios";

// Redux
import { setTodoChecked } from "../redux/appSlice";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/appSlice";
import { removeTodo } from "../redux/appSlice";

// Components
import Checkbox from "./UI/Checkbox";
import Input from "./UI/Input";

const TodoItem: React.FC<ITodo> = ({ id, title, completed }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(title);
  const dispatch = useDispatch();
  const axiosInstance = useCustomAxios();

  const onEditBegin = () => setIsEditing(true);
  const onEditEnd = () => {
    if (userValue.trim().length > 6) {
      return setIsEditing(false);
    }

    dispatch(
      showAlert({ type: "danger", text: "Must be greater than 6 characters" })
    );
  };

  const onEditValue: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13 && userValue.trim().length >= 6) {
      setIsEditing(false);
      dispatch(showAlert({ type: "success", text: "Successfully changed" }));
    } else if (event.keyCode === 13 && userValue.trim().length < 6) {
      dispatch(
        showAlert({ type: "danger", text: "Must be greater than 6 characters" })
      );
    }
  };

  const onDeleteTask = async () => {
    try {
      const deletedTask = await axiosInstance.delete(`/api/task`, {
        data: { taskId: id },
      });
      console.log(deletedTask);
      dispatch(removeTodo(id));
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
          <Checkbox
            checked={completed}
            onCheck={() => dispatch(setTodoChecked(id))}
          />
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
