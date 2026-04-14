import { ThaiPattern } from "./ThaiPattern";
import { cn } from "../_lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        <ThaiPattern />
        {eyebrow ? (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[var(--senlek-gold-600)]">
            {eyebrow}
          </p>
        ) : null}
      </div>
      <h2 className="font-display text-4xl font-bold leading-tight text-[var(--senlek-blue-900)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-[var(--senlek-warm-gray-500)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
