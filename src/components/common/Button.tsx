import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

const buttonVariant = cva(
  "inline-flex justify-center items-center text-center font-medium border-2 border-blue-300 active:brightness-75 transition-all hover:brightness-90 rounded",
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-[13px]",
        md: "px-4 py-1.5 text-[15px]",
        lg: "px-5 py-2 text-[17px]",
      },
      variant: {
        outline: "bg-white text-gray-600",
        contained: "bg-blue-300 text-white",
      },
    },
    defaultVariants: { variant: "contained", size: "md" },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

type ButtonProps = {
  children: ReactNode;
} & ButtonVariantProps &
  (ComponentProps<"button"> | (ComponentProps<typeof Link> & { to: string }));

const Button = ({ variant, size, children, ...props }: ButtonProps) => {
  if ("to" in props) {
    return (
      <Link className={buttonVariant({ variant, size })} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={buttonVariant({ variant, size })} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;
