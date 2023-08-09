import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NotFound } from "../features/ui";

interface ProtectedProps {
  children: React.ReactNode;
}
const ProtectedCategories: React.FC<ProtectedProps> = ({ children }) => {
  const { category } = useParams();
  const userData = useSelector((state: RootState) => state.app.data);
  const currentCategory = userData.filter(
    (data) => data.categoryName === category
  )[0];

  if (!currentCategory) return <NotFound />;
  return children;
};

export default ProtectedCategories;
