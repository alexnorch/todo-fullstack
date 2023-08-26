import useCustomAxios from "../../hooks/useCustomAxios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/appSlice";
import { RootState } from "../../redux/store";
import { updateTodo, removeTodo, addNewTodo } from "../../redux/appSlice";
import { useMemo } from "react";
import { TaskItem } from "./types";

const filterTasks = (tasks: TaskItem[], isCompleted: boolean) =>
  tasks.filter((task) => task.completed === isCompleted);

const useTodoServices = () => {
  const { authAxios } = useCustomAxios();
  const { data } = useSelector((state: RootState) => state.app);

  const allTasks: TaskItem[] = data.flatMap(({ tasks }) => tasks);
  const completedTasks = filterTasks(allTasks, true);
  const uncompletedTasks = filterTasks(allTasks, false);

  const dispatch = useDispatch();

  // Recreate this function on the server side

  const getTaskByCategory = useMemo(() => {
    return (params: { category: string | undefined; isCompleted: boolean }) => {
      const filteredItems = data.filter(
        (item) => item.categoryName === params.category
      );

      return filteredItems.map((item) => ({
        ...item,
        tasks: params.isCompleted
          ? [...item.tasks.filter((task) => task.completed)]
          : [...item.tasks.filter((task) => !task.completed)],
      }))[0].tasks;
    };
  }, [data]);

  const onCreateTask = async (
    title: string,
    category: string | undefined,
    clearField: () => void
  ) => {
    try {
      if (title.length > 6) {
        const { data } = await authAxios.post("/api/task", {
          title,
          category,
        });

        clearField();
        dispatch(addNewTodo(data));
        dispatch(
          showAlert({
            type: "success",
            text: "New task was created",
            duration: 3000,
          })
        );
      } else {
        dispatch(
          showAlert({
            type: "danger",
            text: "Must be greater than 6 characters",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateTask = async (
    id: string,
    userData: { title: string; completed: boolean },
    onEditEnd?: () => void
  ) => {
    try {
      if (userData.title && userData.title.trim().length > 6) {
        const { data } = await authAxios.patch(`/api/task/${id}`, {
          title: userData.title,
          completed: userData.completed,
        });

        dispatch(showAlert({ type: "success", text: "Successfully changed" }));
        dispatch(updateTodo(data));

        onEditEnd && onEditEnd();
      } else {
        dispatch(
          showAlert({
            type: "danger",
            text: "Must be greater than 6 characters",
          })
        );
      }
    } catch (error) {}
  };

  const onDeleteTask = async (id: string) => {
    try {
      const { data } = await authAxios.delete(`/api/task/${id}`);
      dispatch(removeTodo(data));
      dispatch(
        showAlert({
          type: "success",
          text: "The task was successfully deleted",
        })
      );
    } catch (error) {}
  };

  const onCompleteTask = async (
    id: string,
    userData: { title: string; completed: boolean }
  ) => {
    const { data } = await authAxios.patch(`/api/task/${id}`, {
      title: userData.title,
      completed: !userData.completed,
    });

    dispatch(updateTodo(data));
    dispatch(
      showAlert({
        type: "success",
        text: `You have completed the task "${userData.title}"`,
        duration: 3000,
      })
    );
  };

  return {
    completedTasks,
    allTasks,
    uncompletedTasks,
    onUpdateTask,
    onDeleteTask,
    getTaskByCategory,
    onCreateTask,
    onCompleteTask,
  };
};

export default useTodoServices;
