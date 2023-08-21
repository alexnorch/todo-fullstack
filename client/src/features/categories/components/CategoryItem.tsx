import { useState } from "react";
import CategoryMenu from "./CategoryActions";
import { capitalizeFirstLetter } from "../../../helpers";

import { Input } from "../../ui";

const CategoryTitle: React.FC<{ categoryName: string }> = ({
  categoryName,
}) => {
  return (
    <h3 className="category-card__title">
      {capitalizeFirstLetter(categoryName)}
    </h3>
  );
};

const CategoryItem: React.FC<any> = ({ tasks, color, categoryName }) => {
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>(categoryName);

  // onCategoryUpdate
  // onCategoryDelete

  const categoryContent = isTitleEditing ? (
    <Input
      placeholder="New category name"
      onChange={(e: any) => setNewCategoryName(e.target.value)}
      value={newCategoryName}
    />
  ) : (
    <CategoryTitle categoryName={categoryName} />
  );

  return (
    <li
      style={{ borderBottom: `10px solid ${color}` }}
      className="category-card"
    >
      <CategoryMenu onTitleEdit={() => setIsTitleEditing((prev) => !prev)} />
      <div className="category-card__body">
        {categoryContent}
        <hr />
        <p className="category-card__text">All tasks: {tasks.length}</p>
      </div>
    </li>
  );
};

export default CategoryItem;
