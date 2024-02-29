"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}
export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user } = useUser();
  const authmodal = useAuthModal();

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchLikedData = async () => {
      const { error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId)
        .single();

      if (!error && user) {
        setIsLiked(true);
      }
    };
    fetchLikedData();
  }, [songId, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) {
      authmodal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user?.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }

    router.refresh();
  };
  return (
    <button
      className="
    cursor-pointer 
    hover:opacity-75 
    transition
  "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
}
