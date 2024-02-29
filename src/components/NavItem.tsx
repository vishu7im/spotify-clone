import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  Icon: IconType;
  lable: string;
  href: string;
  active?: Boolean;
}

export default function NavItem({ Icon, lable, href, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `
      flex 
      flex-row
      h-auto
      item-center
      w-full
      gap-x-4
      text-md
      cursor-pointer
      hover:text-white
      transition
      text-neutral-400
      py-1
  `,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{lable} </p>
    </Link>
  );
}
