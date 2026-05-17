import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#2b2b2b] text-white border border-[#3a3a3a] hover:bg-[#3a3a3a]",

        active:
          "bg-red-600 text-white border border-red-500 hover:bg-red-500",

        destructive:
          "bg-red-700 text-white hover:bg-red-600",

        outline:
          "bg-transparent border border-[#444] text-white hover:bg-[#2f2f2f]",

        secondary:
          "bg-[#1f1f1f] text-gray-200 hover:bg-[#333]",

        ghost:
          "text-gray-300 hover:bg-[#2a2a2a] hover:text-white",

        link:
          "text-red-500 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
