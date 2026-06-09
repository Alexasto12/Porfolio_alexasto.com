"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "./useReveal";

type RevealProps = {
  as?: ElementType;
  delay?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

/** Wraps children in a scroll-revealed element (transform-only entrance). */
export function Reveal({
  as,
  delay,
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} data-d={delay} {...rest}>
      {children}
    </Tag>
  );
}
