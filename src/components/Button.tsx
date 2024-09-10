import { cva, type VariantProps } from "class-variance-authority";
import { FC } from "react";

const buttonStyles = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
    wide: {
      true: "btn-wide",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    wide: false,
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant,
  size,
  wide,
  children,
  className,
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${buttonStyles({ variant, size, wide, className })} ${
        disabled && "btn-disabled"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
