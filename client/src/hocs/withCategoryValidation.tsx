import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

import { NotFound } from "@features/ui";

const withCategoryValidation = (WrappedComponent: any) => {
  return (props: any) => {
    const { category } = useParams();

    const categories = useSelector(
      (state: RootState) => state.categories.allCategories
    );

    const currentCategory = categories.filter(
      (item) => item.title === category
    )[0];

    if (!currentCategory) return <NotFound />;

    return <WrappedComponent {...props} />;
  };
};

export default withCategoryValidation;
