import useCustomAxios from "../../hooks/useCustomAxios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/appSlice";
import { RootState } from "../../redux/store";
import { updateTodo, removeTodo, addNewTodo } from "../../redux/appSlice";
import { useMemo } from "react";

const useTodoServices = () => {
  const { data } = useSelector((state: RootState) => state.app);
  const { authAxios } = useCustomAxios();
  const dispatch = useDispatch();

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
    userData: { title: string; completed: boolean }
  ) => {
    try {
      const { data } = await authAxios.patch(`/api/task/${id}`, {
        title: userData.title,
        completed: !userData.completed,
      });

      dispatch(updateTodo(data));
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

  return { onUpdateTask, onDeleteTask, getTaskByCategory, onCreateTask };
};

export default useTodoServices;
