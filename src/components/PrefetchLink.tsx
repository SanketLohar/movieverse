"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function PrefetchLink({
  href,
  children,
  className,
}: Props) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
    >
      {children}
    </Link>
  );
}
