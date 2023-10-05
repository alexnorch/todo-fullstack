import { CategoriesContainer, CategoryNew } from "@features/categories";
import { PageHeading } from "@features/ui";

const Categories = () => {
  return (
    <>
      <PageHeading
        title="Categories"
        subtitle="Please choose or create the category"
      />
      <CategoriesContainer />
      <CategoryNew />
    </>
  );
};

export default Categories;
