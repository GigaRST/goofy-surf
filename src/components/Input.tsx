import { forwardRef, InputHTMLAttributes, useState } from "react";
import {
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";

const inputStyles = cva(
  "w-full py-2 bg-white text-black placeholder:text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", // Rimosso pl-10 per renderlo dinamico
  {
    variants: {
      variant: {
        primary: "border-blue-500 focus:ring-blue-500",
        secondary: "border-gray-400 focus:ring-gray-400",
        accent: "border-green-500 focus:ring-green-500",
        ghost: "bg-transparent border-none",
        bordered: "border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputType = type === "password" && showPassword ? "text" : type;

    const hasLeftIcon =
      type === "email" || type === "password" || type === "user";

    return (
      <div className="relative w-full">
        {/* Icona per l'email */}
        {type === "email" ? (
          <EnvelopeIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
            width={20}
          />
        ) : type === "password" ? (
          <KeyIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
            width={20}
          />
        ) : (
          type === "user" && (
            <UserIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              width={20}
            />
          )
        )}

        {/* Icona per la password */}
        {type === "password" && (
          <>
            {showPassword ? (
              <EyeIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
                width={20}
              />
            ) : (
              <EyeSlashIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
                width={20}
              />
            )}
          </>
        )}

        <input
          type={inputType}
          className={`${inputStyles({ variant, className })} ${
            hasLeftIcon ? "pl-10" : "pl-2"
          }`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
