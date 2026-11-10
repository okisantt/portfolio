"use client";

import Link from "next/link";
import { usePageTransition, type TransitionOrigin } from "./TransitionProvider";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Word shown in large type while the page loads. */
  word: string;
  /** Element whose box the band should grow from. Defaults to the link itself. */
  originFrom?: () => Element | null;
  onNavigate?: () => void;
};

/** A link that plays the page transition instead of swapping pages instantly. */
export default function TransitionLink({ href, word, originFrom, onNavigate, onClick, children, ...rest }: Props) {
  const { go } = usePageTransition();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();

        const box = originFrom?.()?.getBoundingClientRect();
        let origin: TransitionOrigin;
        if (box && box.height > 4) {
          origin = { top: box.top, bottom: box.bottom };
        } else {
          const self = event.currentTarget.getBoundingClientRect();
          const middle = self.top + self.height / 2;
          origin = { top: middle - 1, bottom: middle + 1 };
        }
        onNavigate?.();
        go(href, word, origin);
      }}
    >
      {children}
    </Link>
  );
}
