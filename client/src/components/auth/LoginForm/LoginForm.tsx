import { useState } from "react";
import { TextField, IconButton, Button } from "@components/ui";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { useForm, SubmitHandler } from "react-hook-form";
import { useUserServices } from "@components/user";
import { validationOptions } from "../formValidationOptions";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const { loginUser } = useUserServices();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <TextField
        label="email"
        type="email"
        register={register}
        validationOptions={validationOptions.email}
        errors={errors.email}
      />

      <TextField
        label="password"
        type="password"
        register={register}
        validationOptions={validationOptions.password}
        errors={errors.password}
        adornment={
          <IconButton onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </IconButton>
        }
      />

      <div className="auth__bottom">
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
