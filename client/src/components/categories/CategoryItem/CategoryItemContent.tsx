import { useNavigate } from "react-router-dom";
import { hexToRgba, capitalizeFirstLetter } from "helpers";
import { ActionsMenu } from "@components/ui";

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

  const categoryStyles = { border: `2px solid ${hexToRgba(color, 0.7)}` };
  const headingStyles = { color: color };

  return (
    <div onClick={onNavigate} className="category-item">
      <div className="category-item__actions">
        <ActionsMenu onDelete={onDeleting} onEdit={onEditing} />
      </div>
      <div style={categoryStyles} className="category-item__body">
        <h4 style={headingStyles} className="category-item__title">
          {capitalizeFirstLetter(title)}
        </h4>
      </div>
    </div>
  );
};

export default CategoryItemContent;
