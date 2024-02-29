import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "@/actions/getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const superbaseclient = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allsongs = await getSongs();
    return allsongs;
  }

  const { data, error } = await superbaseclient
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return (data as any) || [];
};

export default getSongsByTitle;
