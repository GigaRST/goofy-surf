import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Input from "./Input";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  labelClassName?: string;
}

const FormField: FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
  labelClassName,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className={`label-text text-black ${labelClassName}`}>
          {label}
        </span>
      </label>
      <Input type={type} placeholder={placeholder} {...register} />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;
