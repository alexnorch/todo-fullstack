import { CategoriesList, CategoryNew } from "@features/categories";
import { PageHeading } from "@features/ui";

const Categories = () => {
  return (
    <>
      <PageHeading
        title="Categories"
        subtitle="Please choose or create the category"
      />
      <CategoriesList />
      <CategoryNew />
    </>
  );
};

export default Categories;
