import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteCategory, addCategory } from "../../redux/appSlice";
import Input from "../../components/UI/Input";
import useCustomAxios from "../../hooks/useCustomAxios";

// Icons
import { AiOutlineClose } from "react-icons/ai";

export default function NewCategory() {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const categories = useSelector((state: RootState) => state.app.categories);
  const dispatch = useDispatch();
  const axiosInstance = useCustomAxios();

  const onDeleteCategory = async (_id: string) => {
    await axiosInstance.delete(`/api/category/${_id}`);
    dispatch(deleteCategory(_id));
  };

  const onAddCategory = async () => {
    const response = await axiosInstance.post("/api/category", {
      title,
      color,
    });

    dispatch(addCategory(response.data.createdCategory));
  };

  return (
    <div className="content">
      <h2>List of your categories</h2>
      <ul className="settings-categories">
        {categories.map((item) => (
          <li
            className="settings-categories__item"
            style={{ backgroundColor: item.color }}
            key={item._id}
          >
            <p>{item.title}</p>
            <button
              onClick={() => onDeleteCategory(item._id)}
              className="settings-categories__btn"
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
      <h2>Create your first category</h2>
      <Input
        value={title}
        placeholder="Category title"
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <Input
        value={color}
        placeholder="Category color (in hex format)"
        onChange={(e: any) => setColor(e.target.value)}
      />
      <button onClick={onAddCategory}>Create</button>
    </div>
  );
}
