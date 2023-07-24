import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../redux/appSlice";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

import useCustomAxios from "../hooks/useCustomAxios";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const { category } = useParams();
  const axiosInstance = useCustomAxios();
  const dispatch = useDispatch();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (title.length > 6) {
        const response: AxiosResponse<any> = await axiosInstance.post(
          "/api/task",
          { title, categoryName: category }
        );
        const { createdTask } = response.data; // Extract the response data from the AxiosResponse object
        dispatch(addNewTodo(createdTask));
        setTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-task">
      <form onSubmit={onSubmit} className="new-task__wrapper">
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="new-task__wrapper__input"
          type="text"
          placeholder="What is your next task?"
        />
      </form>
    </div>
  );
};

export default NewTodo;
