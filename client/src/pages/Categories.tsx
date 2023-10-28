import { CategoriesList, CategoryNew } from "@components/categories";
import { PageHeading } from "@components/ui";

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
