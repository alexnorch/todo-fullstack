import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteCategory, addCategory } from "../../redux/appSlice";
import useCustomAxios from "../../hooks/useCustomAxios";

// Components
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import Input from "../ui/Input";

// Icons
import { AiOutlineClose } from "react-icons/ai";

export default function NewCategory() {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const userData = useSelector((state: RootState) => state.app.data);
  const dispatch = useDispatch();
  const { authAxios } = useCustomAxios();

  const userCategories =
    userData.length !== 0 &&
    userData.map(({ categoryName, color, _id }) => (
      <li
        className="categories-settings__list__item"
        style={{ backgroundColor: color }}
        key={_id}
      >
        <p>{categoryName}</p>
        <button
          onClick={() => onDeleteCategory(_id)}
          className="settings-categories__btn"
        >
          <AiOutlineClose />
        </button>
      </li>
    ));

  const onDeleteCategory = async (_id: string) => {
    await authAxios.delete(`/api/category/${_id}`);
    dispatch(deleteCategory(_id));
  };

  const onAddCategory = async () => {
    try {
      const { data } = await authAxios.post("/api/category", {
        title,
        color,
      });

      dispatch(addCategory(data));

      // Clear input fields
      setTitle("");
      setColor("#000000");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="settings__section">
        <h3 className="settings__section__heading">My categories:</h3>
        <hr />
        <p className="settings__section__descr">
          Below are listed your categories. If you want to delete or change
          title of category or color, you can do it right here
        </p>
        <ul className="categories-settings__list">{userCategories}</ul>
      </section>
      <section className="settings__section">
        <h3 className="settings__section__heading">Create new category:</h3>
        <hr />
        <p className="settings__section__descr">
          Please provide category name and pick the color. If you don't what
          category to create. You can chose among these categories: Mind Care,
          Learning, Chores, Deep Work
        </p>
        <form className="settings__section__form">
          <Input
            label="Please provide a title of category"
            value={title}
            placeholder="Category title"
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <ColorPicker
            labelText="Please chose the color"
            color={color}
            setColor={(e: any) => setColor(e.target.value)}
          />
        </form>
        <Button onClick={onAddCategory} variant="primary">
          Create category
        </Button>
      </section>
    </>
  );
}
