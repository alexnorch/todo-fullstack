import { useState } from "react";
import { capitalizeFirstLetter } from "../../../helpers";
import "./CategoryItem.scss";

import { CategoryEditing, CategoryDeleting } from "@features/categories";
import { ActionsMenu } from "@features/ui";

const CategoryItem: React.FC<any> = ({ tasks, color, categoryName, _id }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onDeleteBegin = () => setIsDeleting(true);
  const onEditBegin = () => setIsEditing(true);

  const onConfirmToggle = () => setIsDeleting((isDeleting) => !isDeleting);
  const onModalToggle = () => setIsEditing((prevState) => !prevState);

  const categoryStyles = { borderBottom: `10px solid ${color}` };

  return (
    <>
      <div style={categoryStyles} className="category-column">
        <div className="category-column__actions">
          <ActionsMenu onDelete={onDeleteBegin} onEdit={onEditBegin} />
        </div>
        <div className="category-column__body">
          <h3 className="category-column__title">
            {capitalizeFirstLetter(categoryName)}
          </h3>
          <hr />
          <p className="category-column__text">All tasks: {tasks.length}</p>
        </div>
      </div>

      <CategoryDeleting
        id={_id}
        onConfirmToggle={onConfirmToggle}
        isDeleting={isDeleting}
      />

      <CategoryEditing
        id={_id}
        onModalToggle={onModalToggle}
        categoryName={categoryName}
        categoryColor={color}
        isEditing={isEditing}
      />
    </>
  );
};

export default CategoryItem;