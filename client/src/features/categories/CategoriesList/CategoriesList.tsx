import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoriesList.scss";

const CategoriesList = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.allCategories
  );

  return (
    <div className="categories-row">
      {categories.map((item) => (
        <CategoryItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CategoriesList;
