"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import NavItem from "./NavItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface Sidebarprops {
  children: React.ReactNode;
  songs: Song[];
}

export default function Sidebar({ children, songs }: Sidebarprops) {
  const pathname = usePathname();

  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        Icon: HiHome,
        lable: "Home",
        href: "/",
        active: pathname !== "/search",
      },
      {
        Icon: BiSearch,
        lable: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {" "}
            {routes.map((item) => (
              <NavItem key={item.lable} {...item} />
            ))}
          </div>{" "}
        </Box>
        <Box className="overflow-y-auto h-full">
          {" "}
          <Library songs={songs} />{" "}
        </Box>
      </div>
      <main className=" h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}
