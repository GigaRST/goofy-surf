import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// Definiamo le varianti di stile utilizzando CVA
const hashtagBadgeStyles = cva(
  "inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm", // Stili base
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        accent: "bg-accent text-white",
        neutral: "bg-neutral text-white",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Definizione delle props del componente
interface HashtagBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hashtagBadgeStyles> {
  text: string; // Testo dell'hashtag
}

// Componente HashtagBadge
const HashtagBadge: React.FC<HashtagBadgeProps> = ({
  text,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <div
      className={hashtagBadgeStyles({ variant, size, className })}
      {...props}
    >
      #{text}
    </div>
  );
};

export default HashtagBadge;
