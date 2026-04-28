import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonVariant = "primary" | "secondary" | "ghostDark";

const variantClass: Record<ActionButtonVariant, string> = {
  primary: "bg-[linear-gradient(180deg,#443025_0%,#2f2118_100%)] text-[#f8eddc] shadow-[0_12px_28px_rgba(52,33,19,0.22)] hover:brightness-[1.04]",
  secondary: "border border-[rgba(122,88,53,0.42)] bg-[rgba(246,236,220,0.84)] text-[var(--text-strong)] shadow-[inset_0_1px_0_rgba(255,250,242,0.58)] hover:brightness-[1.03]",
  ghostDark: "border border-[rgba(233,210,174,0.22)] bg-[rgba(255,243,222,0.06)] text-[#f5e6cf] hover:border-[rgba(233,210,174,0.42)] hover:bg-[rgba(255,243,222,0.12)]"
};

const baseClass =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-faded)] motion-safe:hover:-translate-y-0.5";

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
