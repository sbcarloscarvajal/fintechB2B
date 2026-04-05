import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FintechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "institutional" | "outline";
  size?: "default" | "lg";
}

export const FintechButton = forwardRef<HTMLButtonElement, FintechButtonProps>(
  ({ variant = "institutional", size = "default", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 font-medium",
          size === "default" && "px-4 py-2 min-h-[44px]",
          size === "lg" && "px-6 py-3 text-lg min-h-[48px]",
          variant === "institutional" && !disabled && "bg-fintech-institutional text-primary-foreground hover:opacity-90 active:opacity-80",
          variant === "institutional" && disabled && "bg-muted text-muted-foreground cursor-not-allowed",
          variant === "outline" && !disabled && "border-2 border-fintech-institutional text-fintech-institutional hover:bg-fintech-institutional hover:text-primary-foreground",
          variant === "outline" && disabled && "border-2 border-muted text-muted-foreground cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FintechButton.displayName = "FintechButton";
