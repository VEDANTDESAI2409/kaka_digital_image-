import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white shadow transition hover:bg-violet-700"
    >
      {children}
    </Link>
  );
}