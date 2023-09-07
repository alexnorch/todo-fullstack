import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoriesList.scss";

const CategoriesList = () => {
  const data = useSelector((state: RootState) => state.app.data);
  return (
    <div className="categories-row">
      {data.map((item) => (
        <CategoryItem key={item._id} {...item} />
      ))}
    </div>
  );
};

export default CategoriesList;
