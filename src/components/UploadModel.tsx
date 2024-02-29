"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Model";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import unique from "uniqid";
import { useRouter } from "next/navigation";

export default function UploadModel() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const useUpload = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
    },
  });

  const onchange = (open: boolean) => {
    if (!open) {
      reset();
      useUpload.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = unique();
      //   song

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      // image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`images-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      //   record

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      useUpload.onClose();
    } catch (error) {
      toast.error("Somthing Went wrong ");
    } finally {
      setIsLoading(false);
    }
    // upload to supabase
  };
  return (
    <Modal
      isOpen={useUpload.isOpen}
      onChange={onchange}
      title="Add an Song"
      description="Upload an mp3 file"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1"> Select a Song </div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1"> Select an image </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}
