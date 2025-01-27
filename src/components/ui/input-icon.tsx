import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {startIcon && (
          <span className="absolute left-3 flex items-center">{startIcon}</span>
        )}

        <input
          type={type}
          className={cn(
            "flex h-10 w-full px-3 py-7 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-2xl border border-input bg-[#F2F4F7]  text-sm ring-offset-background focus:bg-blue-100",
            // "flex h-10 w-full rounded-2xl border border-input focus-visible:ring-blue-300 bg-[#F2F4F7] px-3 py-7 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-blue-100",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {endIcon && (
          <span className="absolute right-3 flex items-center cursor-pointer">
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);

InputIcon.displayName = "InputIcon";

export { InputIcon };
