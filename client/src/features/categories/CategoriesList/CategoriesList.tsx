import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "redux/store";
import { IoAddSharp } from "react-icons/io5";
import { capitalizeFirstLetter } from "../../../helpers";
import "./CategoriesList.scss";

interface CategoryItemProps {
  id: string;
  title: string;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ id, title, color }) => {
  const categoryStyles = { backgroundColor: color };
  const categoryPath = `/tasks/${title.toLocaleLowerCase()}`;

  return (
    <li key={id} className="menu-categories__item">
      <span style={categoryStyles} className="menu-categories__dot"></span>
      <Link className="menu-categories__link" to={categoryPath}>
        {capitalizeFirstLetter(title)}
      </Link>
    </li>
  );
};

const CategoryItemAdd = () => {
  const navigate = useNavigate();

  const onNavigate = () => navigate("/settings/categories");

  return (
    <li onClick={onNavigate} className="category-item-add">
      <IoAddSharp className="category-item-add__icon" />
      <span>New category</span>
    </li>
  );
};

const CategoriesList = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.allCategories
  );

  return (
    <ol className="menu-categories__list">
      <p className="menu__text">My categories:</p>
      {categories.length === 0 && <CategoryItemAdd />}
      {categories.map((category) => (
        <CategoryItem
          key={category._id}
          id={category._id}
          title={category.title}
          color={category.color}
        />
      ))}
    </ol>
  );
};

export default CategoriesList;
