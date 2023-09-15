import { useDispatch, useSelector } from "react-redux";

import useCustomAxios from "@hooks/useCustomAxios";
import useAlert from "@hooks/useAlert";

import { RootState } from "../../redux/store";
import { updateTask, removeTask, addNewTask } from "./todoSlice";
import { IUserData, CategoryType } from "./types";

const useTodoServices = () => {
  const { authAxios } = useCustomAxios();
  const { showDangerAlert, showSuccessAlert } = useAlert();
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);

  const dispatch = useDispatch();

  const getTasksByCategory = (params: {
    category: string | undefined;
    isCompleted: boolean;
  }) => {
    return allTasks.filter(
      (task) =>
        task.category === params.category &&
        task.completed === params.isCompleted
    );
  };

  const fetchTasks = () => {};

  const onCreateTask = async (
    title: string,
    category: CategoryType,
    clearField: () => void
  ) => {
    if (title.length > 6) {
      const { data } = await authAxios.post("/api/task", {
        title,
        category,
      });

      clearField();
      dispatch(addNewTask(data));
      showSuccessAlert("New task was created");
    } else {
      showDangerAlert("Must be greater than 6 characters");
    }
  };

  const onUpdateTask = async (id: string, userData: IUserData) => {
    if (userData.title && userData.title.trim().length > 6) {
      const { data } = await authAxios.patch(`/api/task/${id}`, {
        title: userData.title,
        completed: userData.completed,
      });

      showSuccessAlert("The task was successfully changed");
      dispatch(updateTask(data));
    } else {
      showDangerAlert("Must be greater than 6 characters");
    }
  };

  const onDeleteTask = async (id: string) => {
    const { data } = await authAxios.delete(`/api/task/${id}`);

    dispatch(removeTask(data));
    showSuccessAlert("The task was successfully deleted");
  };

  const onCompleteTask = async (id: string, userData: IUserData) => {
    const { data } = await authAxios.patch(`/api/task/${id}`, {
      title: userData.title,
      completed: !userData.completed,
    });

    dispatch(updateTask(data));
    showSuccessAlert(`You have completed the task "${userData.title}"`);
  };

  return {
    onUpdateTask,
    onDeleteTask,
    getTasksByCategory,
    onCreateTask,
    onCompleteTask,
  };
};

export default useTodoServices;
