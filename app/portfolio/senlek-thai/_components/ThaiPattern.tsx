import { cn } from "../_lib/utils";

interface ThaiPatternProps {
  className?: string;
  variant?: "divider" | "lotus" | "swirl";
}

export function ThaiPattern({ className, variant = "divider" }: ThaiPatternProps) {
  if (variant === "lotus") {
    return (
      <svg
        viewBox="0 0 160 160"
        className={cn("h-20 w-20 text-[rgba(240,199,94,0.22)]", className)}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M80 18C71 42 55 53 40 60c6-18 16-34 40-42Zm0 0c9 24 25 35 40 42-6-18-16-34-40-42Zm-11 46c-4 22-20 35-38 42 2-22 13-39 38-42Zm22 0c25 3 36 20 38 42-18-7-34-20-38-42ZM80 55c14 22 13 50 0 73-13-23-14-51 0-73Z"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "swirl") {
    return (
      <svg
        viewBox="0 0 220 160"
        className={cn("h-16 w-24 text-[rgba(240,199,94,0.16)]", className)}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M27 106c20 0 35-15 35-34 0-18-13-31-30-31-20 0-33 14-33 30 0 18 16 31 34 31 22 0 39-17 39-38 0-24-18-41-43-41-29 0-49 22-49 49 0 32 25 55 59 55 38 0 66-29 66-67 0-43-32-73-76-73"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 40" className={cn("h-6 w-40 text-[var(--senlek-gold-500)]", className)} fill="none" aria-hidden="true">
      <path d="M10 20h70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M160 20h70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M120 7c-8 10-20 14-20 24 10-2 17-7 20-14 3 7 10 12 20 14 0-10-12-14-20-24Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
