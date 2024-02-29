"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

export default function Library({ songs }: LibraryProps) {
  const AuthModal = useAuthModal();
  const UploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onclick = () => {
    if (!user) {
      AuthModal.onOpen();
    }

    //TODO: check Subscription
    UploadModal.onOpen();
  };
  return (
    <div className="flex flex-col ">
      <div className="flex item-center justify-between px-5 pt-4 ">
        <div className="inline-flex items-center gap-x-2 ">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>

        <AiOutlinePlus
          size={22}
          onClick={onclick}
          className="cursor-pointe hover:text-white transition text-neutral-400"
        />
      </div>

      <div className=" flex flex-col gap-y-2 mt-4 px-3">
        {" "}
        {songs.map((item) => {
          return (
            <MediaItem
              key={item.id}
              onClick={(id: string) => onPlay(id)}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
}
