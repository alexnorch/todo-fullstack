import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CategoryItem from "./CategoryItem";
import { IconButton } from "../../ui";

import { AiOutlinePlus } from "react-icons/ai";

const CategoriesList = () => {
  const data = useSelector((state: RootState) => state.app.data);
  return (
    <div className="categories-container">
      {data.map((item) => (
        <CategoryItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CategoriesList;
