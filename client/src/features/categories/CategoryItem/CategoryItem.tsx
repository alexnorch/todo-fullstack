import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, hexToRgba } from "../../../helpers";
import "./CategoryItem.scss";

import { CategoryEditing, CategoryDeleting } from "@features/categories";
import { ActionsMenu } from "@features/ui";

const CategoryItem: React.FC<any> = ({ tasks, color, title, _id }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const navigate = useNavigate();
  const onDeleteBegin = () => setIsDeleting(true);
  const onEditBegin = () => setIsEditing(true);

  const onConfirmToggle = () => setIsDeleting((isDeleting) => !isDeleting);
  const onModalToggle = () => setIsEditing((prevState) => !prevState);
  const onNavigate = () => navigate(`/categories/${title}`);

  const categoryStyles = { backgroundColor: hexToRgba(color, 0.5) };

  return (
    <>
      <div style={categoryStyles} className="category-column">
        <div className="category-column__actions">
          <ActionsMenu onDelete={onDeleteBegin} onEdit={onEditBegin} />
        </div>

        <div onClick={onNavigate} className="category-column__body">
          <h4 className="category-column__title">
            {capitalizeFirstLetter(title)}
          </h4>
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
        categoryName={title}
        categoryColor={color}
        isEditing={isEditing}
      />
    </>
  );
};

export default CategoryItem;
