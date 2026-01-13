import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "w-full rounded-lg px-4 py-2 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-neutral-800 text-white hover:bg-neutral-700"
      : "bg-transparent text-neutral-800 hover:bg-neutral-100";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
