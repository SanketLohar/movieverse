"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function PrefetchLink({
  href,
  children,
  className,
}: Props) {
  const router = useRouter();

  const prefetch = useCallback(() => {
    router.prefetch(href);
  }, [href, router]);

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={prefetch}
      onFocus={prefetch}
    >
      {children}
    </Link>
  );
}
