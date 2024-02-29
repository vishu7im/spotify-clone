import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const superbaseclient = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await superbaseclient.auth.getSession();
  const { data, error } = await superbaseclient
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
