import { useDispatch } from "react-redux";

import useCustomAxios from "@hooks/useCustomAxios";
import useAlert from "@hooks/useAlert";

import { deleteCategory, addCategory, updateCategory } from "./categorySlice";

const _baseURL = "/api/category";

const useCategoryServices = () => {
  const dispatch = useDispatch();
  const { showSuccessAlert } = useAlert();
  const { authAxios } = useCustomAxios();

  const onDeleteCategory = async (categoryId: string) => {
    await authAxios.delete(`${_baseURL}/${categoryId}`);
    dispatch(deleteCategory(categoryId));
  };

  const onAddCategory = async (categoryData: {
    title: string;
    color: string;
  }) => {
    try {
      const result = await authAxios.post(_baseURL, categoryData);

      if (result.data) {
        dispatch(addCategory(result.data));
        showSuccessAlert("The category was successfully created");
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
      `${_baseURL}/${categoryId}`,
      categoryData
    );

    if (result.data) {
      dispatch(updateCategory(result.data));

      showSuccessAlert("The category was successfully updated");
    }
  };

  return {
    onDeleteCategory,
    onAddCategory,
    onUpdateCategory,
  };
};

export default useCategoryServices;
