import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../_lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--senlek-gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--senlek-dark)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--senlek-gold-500)] text-[var(--senlek-dark)] shadow-[0_12px_30px_rgba(212,160,23,0.25)] hover:-translate-y-0.5 hover:bg-[var(--senlek-gold-400)]",
        secondary:
          "border border-white/30 bg-white/5 text-white hover:-translate-y-0.5 hover:border-[var(--senlek-gold-300)] hover:bg-white/10",
        dark: "bg-[var(--senlek-dark)] text-white hover:-translate-y-0.5 hover:bg-[var(--senlek-blue-900)]",
        outline:
          "border border-[var(--senlek-blue-300)] bg-transparent text-[var(--senlek-blue-900)] hover:-translate-y-0.5 hover:border-[var(--senlek-gold-400)] hover:text-[var(--senlek-dark)]",
        ghost:
          "bg-transparent text-[var(--senlek-blue-900)] hover:bg-[var(--senlek-blue-50)]"
      },
      size: {
        default: "text-sm",
        sm: "min-h-10 px-4 py-2 text-xs",
        lg: "min-h-12 px-6 py-3.5 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
