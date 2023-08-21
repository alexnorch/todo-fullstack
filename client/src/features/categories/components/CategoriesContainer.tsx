import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CategoryItem from "./CategoryItem";

const CategoriesContainer = () => {
  const data = useSelector((state: RootState) => state.app.data);
  return (
    <div className="categories-container">
      {data.map((item) => (
        <CategoryItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CategoriesContainer;
