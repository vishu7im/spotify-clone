"use client";

import useSongById from "@/hooks/useGetSongByid";
import useLoadSongUrl from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const Player = usePlayer();

  const { song } = useSongById(Player.activeId);

  const SongUrl = useLoadSongUrl(song!);

  if (!song || !SongUrl || !Player.activeId) {
    return null;
  }
  return (
    <div
      className="
    fixed 
    bottom-0 
    bg-black 
    w-full 
    py-2 
    h-[80px] 
    px-4
  "
    >
      <PlayerContent key={SongUrl} song={song} songUrl={SongUrl} />
    </div>
  );
}
