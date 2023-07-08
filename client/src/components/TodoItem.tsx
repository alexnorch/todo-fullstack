import { useState } from "react";

// Redux
import { setTodoChecked } from "../redux/todoSlice";
import { useDispatch } from "react-redux";
import { removeTodo } from "../redux/todoSlice";

// Components
import Checkbox from "./UI/Checkbox";
import Input from "./UI/Input";

const TodoItem: React.FC<ITodo> = ({ id, text, completed }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userValue, setUserValue] = useState<string>(text);
  const dispatch = useDispatch();

  const TodoContent = isEditing ? (
    <Input
      placeholder="Type a new title of task"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUserValue(e.target.value)
      }
      value={userValue}
    />
  ) : (
    <p
      onClick={() => setIsEditing((state) => !state)}
      className="tasks__task__content__text"
    >
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
          <button
            className="tasks__task__delete"
            onClick={() => dispatch(removeTodo(id))}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;

// .edit {
//   cursor: pointer;
//   color: var(--orange);
//   border: 1px solid var(--orange);
//   padding: 10px 15px;
//   font-size: 18px;
//   border-radius: 5px;
//   transition: all 0.3s ease;
// }

// .edit:hover {
//   color: var(--white);
//   background-color: var(--orange);
// }

// .delete:hover {
//   color: var(--white);
//   background-color: var(--red);
// }

// .changeInput {
//   position: relative;
//   font-size: 18px;
//   font-family: sans-serif;
//   border: none;
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   padding: 5px 10px;
//   margin-left: 10px;
//   width: 90%;
// }

// .changeInput:focus {
//   outline: none;
// }
