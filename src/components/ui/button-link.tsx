type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-chip font-mono font-semibold tracking-wide uppercase transition-[transform,box-shadow,border-color,color,background-color] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const variants = {
  primary:
    "bg-primary-solid text-white shadow-[0_0_20px_-6px_var(--glow)] hover:shadow-[0_0_28px_-4px_var(--glow)]",
  ghost:
    "border border-line-strong bg-surface/70 text-fg backdrop-blur-sm hover:border-primary hover:text-primary-text",
};

const sizes = { md: "px-5 py-3 text-xs", sm: "px-3.5 py-2 text-[0.6875rem]" };

export function ButtonLink({
  variant = "primary",
  size = "md",
  external,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
