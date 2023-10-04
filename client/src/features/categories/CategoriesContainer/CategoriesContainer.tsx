import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoriesContainer.scss";

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
    <div className="categories-container">
      <h3>My categories</h3>
      <div className="categories-row">
        {categories.map((item) => (
          <CategoryItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesContainer;
