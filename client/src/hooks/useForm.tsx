import { useState } from "react";

interface useFormParams {
  [key: string]: string;
}

const useForm = (initialValues: useFormParams) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const validation = () => {
    let errors: { [key: string]: string } = {};

    for (const key in values) {
      if (key === "name" && values[key].length < 6) {
        errors["name"] = "Must be greater than 6 characters";
      }
      if (key === "email" && !values[key].includes("@")) {
        errors["email"] = "Please, provide a valid e-mail address";
      }

      if (key === "password" && values[key].length < 6) {
        errors["password"] = "Must be greater than 6 characters";
      }

      if (
        key === "confirmPassword" &&
        values[key].trim() !== values["password"].trim()
      ) {
        errors["confirmPassword"] = "Password does not match";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return { values, errors, onChange, validation };
};

export default useForm;
