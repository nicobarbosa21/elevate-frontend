import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "app-btn w-full text-sm";
  const styles = variant === "primary" ? "app-btn-primary" : "app-btn-ghost";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
