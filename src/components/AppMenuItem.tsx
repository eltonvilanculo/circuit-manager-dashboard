import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onSelect?: () => void;
};

export const AppMenuItem = ({
  href,
  icon,
  label,
  active = false,
  onSelect,
}: Props) => {
  return (
    <Link
      onClick={onSelect}
      href={href}
      className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
        !active
          ? "hover:bg-primary-foreground/50 bg-primary-foreground text-white"
          : "hover:bg-gray-300 bg-white text-primary-foreground"
      }`}
      prefetch={false}
    >
      {icon}
      {label}
    </Link>
  );
};
