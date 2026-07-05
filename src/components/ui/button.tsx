import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Pill buttons with soft shadows and smooth gallery-grade hover transitions.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Dark charcoal → warm bronze on hover (primary CTA)
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-accent hover:text-accent-foreground hover:shadow-lift hover:-translate-y-0.5",
        // Outlined secondary CTA
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:-translate-y-0.5",
        bronze:
          "bg-accent text-accent-foreground shadow-soft hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-foreground underline-offset-4 hover:text-accent hover:underline rounded-none",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-105",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-sm tracking-wide",
        xl: "h-14 px-10 text-base tracking-wide",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
