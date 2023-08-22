import useCustomAxios from "../../hooks/useCustomAxios";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  addCategory,
  showAlert,
  updateCategory,
} from "../../redux/appSlice";

const useCategoryServices = () => {
  const baseURL = "/api/category";
  const dispatch = useDispatch();
  const { authAxios } = useCustomAxios();

  const onDeleteCategory = async (categoryId: string) => {
    await authAxios.delete(`${baseURL}/${categoryId}`);
    dispatch(deleteCategory(categoryId));
  };

  const onAddCategory = async (categoryData: {
    title: string;
    color: string;
  }) => {
    try {
      const result = await authAxios.post(baseURL, categoryData);

      if (result.data) {
        dispatch(addCategory(result.data));
        dispatch(
          showAlert({
            type: "success",
            text: "The category was successfully created",
          })
        );
      }
    } catch (error) {
      console.log("error");
    }
  };

  const onUpdateCategory = async (
    categoryId: string,
    categoryData: { title: string; color: string }
  ) => {
    const result = await authAxios.patch(
      `${baseURL}/${categoryId}`,
      categoryData
    );

    if (result.data) {
      dispatch(updateCategory(result.data));

      dispatch(
        showAlert({
          type: "success",
          text: "The category was successfully updated",
        })
      );
    }
  };

  return {
    onDeleteCategory,
    onAddCategory,
    onUpdateCategory,
  };
};

export default useCategoryServices;
