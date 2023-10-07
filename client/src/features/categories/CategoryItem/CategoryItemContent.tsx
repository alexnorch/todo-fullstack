import { useNavigate } from "react-router-dom";
import { hexToRgba, capitalizeFirstLetter } from "helpers";
import { ActionsMenu } from "@features/ui";

interface ICategoryItemContent {
  color: string;
  title: string;
  onEditing: () => void;
  onDeleting: () => void;
}

const CategoryItemContent: React.FC<ICategoryItemContent> = (props) => {
  const { title, color, onDeleting, onEditing } = props;

  const navigate = useNavigate();
  const onNavigate = () => navigate(`/categories/${title}`);
  const categoryStyles = { backgroundColor: hexToRgba(color, 0.5) };

  return (
    <div style={categoryStyles} className="category-column">
      <div className="category-column__actions">
        <ActionsMenu onDelete={onDeleting} onEdit={onEditing} />
      </div>
      <div onClick={onNavigate} className="category-column__body">
        <h4 className="category-column__title">
          {capitalizeFirstLetter(title)}
        </h4>
      </div>
    </div>
  );
};

export default CategoryItemContent;
