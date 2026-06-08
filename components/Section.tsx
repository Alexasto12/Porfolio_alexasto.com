import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  /** Dark, full-bleed band (keeps content inside the shell). */
  dark?: boolean;
  /** Skip the inner `.shell` wrapper (caller controls its own width). */
  bleed?: boolean;
  /** Reduced top padding — for the very first section under the header. */
  first?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Single source of truth for vertical rhythm and horizontal gutters. Every
 * section flows through here so spacing stays consistent instead of being
 * hand-tuned per component (which is what made things feel cramped).
 */
export function Section({
  id,
  dark,
  bleed,
  first,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "section",
        first && "section--first",
        dark && "dark-block",
        className
      )}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
