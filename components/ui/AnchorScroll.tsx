"use client";

import { useEffect } from "react";

/**
 * In-page links, scrolled by hand. With CSS `scroll-behavior: smooth` the
 * browser drops a second jump made while the first one is still running
 * (the hash changes but the page stays put), so the smooth scroll is done
 * here: scrollIntoView honours scroll-padding, the hash goes into the
 * history and focus moves to the target, as with a native jump. It also
 * closes the header menu after a choice, on Escape and when keyboard focus
 * leaves it (so the open panel never hides the next focused link). Without
 * JavaScript the links still work, with an instant jump. Renders nothing.
 */
export function AnchorScroll() {
  useEffect(() => {
    const closeMenu = () => document.querySelectorAll<HTMLDetailsElement>("details.site-menu[open]").forEach((d) => (d.open = false));

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      // Only links to this same page: other pages load normally.
      if (a.origin !== location.origin || a.pathname.replace(/\/$/, "") !== location.pathname.replace(/\/$/, "")) return;
      const id = decodeURIComponent(a.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      closeMenu();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (location.hash !== a.hash) history.pushState(history.state, "", a.hash);
      if (!el.matches("a, button, input, select, textarea, [tabindex]")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const open = document.querySelector<HTMLDetailsElement>("details.site-menu[open]");
      if (!open) return;
      const inside = open.contains(document.activeElement);
      open.open = false;
      if (inside) open.querySelector("summary")?.focus();
    };
    // relatedTarget is null for a pointer click inside the panel: only a real move elsewhere closes it.
    const onFocusOut = (e: FocusEvent) => {
      const open = (e.target as Element | null)?.closest?.("details.site-menu[open]") as HTMLDetailsElement | null;
      const to = e.relatedTarget as Node | null;
      if (open && to && !open.contains(to)) open.open = false;
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return null;
}
