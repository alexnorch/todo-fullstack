import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@components/ui";
import { validationOptions } from "../formValidationOptions";
import { useUserServices } from "@components/user";

const extendedValidationOptions = {
  ...validationOptions,
  confirmPassword: {
    required: "Confirm password is required",
  },
};

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const { registerUser } = useUserServices();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <TextField
        register={register}
        validationOptions={extendedValidationOptions.email}
        errors={errors.email}
        label="email"
      />
      <TextField
        register={register}
        type="password"
        label="password"
        errors={errors.password}
        validationOptions={extendedValidationOptions.password}
      />
      <TextField
        register={register}
        type="password"
        label="confirmPassword"
        errors={errors.confirmPassword}
        validationOptions={extendedValidationOptions.confirmPassword}
      />
      <div className="auth__bottom">
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          type="button"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
