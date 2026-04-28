import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonVariant = "primary" | "secondary" | "ghostDark";

const variantClass: Record<ActionButtonVariant, string> = {
  primary: "bg-[#1F2933] text-white hover:bg-[#111827]",
  secondary: "border border-[#D8E0E7] bg-white/70 text-[#1F2933] hover:border-[#AFC0CF] hover:bg-white",
  ghostDark: "border border-white/20 bg-white/8 text-white hover:border-white/45 hover:bg-white/14"
};

const baseClass =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9] motion-safe:hover:-translate-y-0.5";

interface SharedProps {
  children: ReactNode;
  className?: string;
  variant?: ActionButtonVariant;
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function ActionButton({ children, className = "", variant = "secondary", ...props }: ButtonProps | AnchorProps) {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  if ("href" in props) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
