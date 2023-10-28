import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { CategoryItem } from "@components/categories";
import "./CategoriesList.scss";

const CategoriesContainer = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.allCategories
  );

  if (categories.length === 0) {
    return (
      <>
        <h3>You don't have any category yet</h3>
        <p>Please create your first category</p>
      </>
    );
  }

  return (
    <div className="categories">
      {categories.map((item) => (
        <CategoryItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CategoriesContainer;
