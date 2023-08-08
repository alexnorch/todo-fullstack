import { TaskItem } from "./types";
import { BsArrowReturnLeft } from "react-icons/bs";
import useCustomAxios from "../../hooks/useCustomAxios";
import { updateTodo } from "../../redux/appSlice";
import { useDispatch } from "react-redux";

interface CompletedTasksProps {
  tasks: TaskItem[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const { authAxios } = useCustomAxios();
  const dispatch = useDispatch();

  const onUpdateTask = async (task: TaskItem) => {
    try {
      const { data } = await authAxios.patch(`/api/task/${task._id}`, {
        title: task.title,
        completed: !task.completed,
      });

      dispatch(updateTodo(data));
    } catch (error) {}
  };

  return (
    <div className="completed-tasks">
      <ul className="completed-tasks__list">
        {tasks.map((item) => (
          <li key={item._id} className="completed-tasks__list__item">
            <p className="completed-tasks__list__item__text">{item.title}</p>
            <button
              onClick={() => onUpdateTask(item)}
              className="completed-tasks__list__item__btn"
            >
              <BsArrowReturnLeft />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
