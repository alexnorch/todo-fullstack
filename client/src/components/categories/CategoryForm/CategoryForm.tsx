import { TextField, ColorPicker } from "@components/ui";
import { useForm } from "react-hook-form";
import "./CategoryForm.scss";

interface CategoryFormProps {
  submitForm: (data: ICategory) => void;
}

interface ICategory {
  title: string;
  color: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ submitForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICategory>();

  const onSubmit = (data: ICategory) => {
    submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="category-form">
      <TextField name="title" label="New Category Name" register={register} />
      <ColorPicker name="color" register={register} />
      <button>Submit</button>
    </form>
  );
};

export default CategoryForm;
