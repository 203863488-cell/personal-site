import { ArrowRight, type LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SignalButtonVariant = "dark" | "light" | "ghost";

const variantClass: Record<SignalButtonVariant, string> = {
  dark: "border-[#1F2933] bg-[#1F2933] text-white hover:bg-[#111827]",
  light: "border-[#D8E0E7] bg-white/78 text-[#1F2933] hover:border-[#AFC0CF] hover:bg-white",
  ghost: "border-white/20 bg-white/8 text-white hover:border-white/45 hover:bg-white/14"
};

interface SharedProps {
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "end" | "start";
  variant?: SignalButtonVariant;
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function SignalButton({
  children,
  className = "",
  icon: Icon = ArrowRight,
  iconPosition = "end",
  variant = "light",
  ...props
}: ButtonProps | AnchorProps) {
  const classes = `signal-button ${variantClass[variant]} ${className}`;
  const content = (
    <>
      {iconPosition === "start" ? <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} /> : null}
      <span>{children}</span>
      {iconPosition === "end" ? <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} /> : null}
    </>
  );

  if ("href" in props) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
