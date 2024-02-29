"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderPeops {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderPeops) {
  const router = useRouter();
  const AuthModal = useAuthModal();

  const superbaseclient = useSupabaseClient();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await superbaseclient.auth.signOut();

    //TODO:playing song reset
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out");
    }
  };

  return (
    <div
      className={twMerge(`h-fit bg-gradient-to-b from-blue-900 p-6`, className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-60 transition">
            <RxCaretLeft
              onClick={() => router.back()}
              className="text-white"
              size={35}
            />
          </button>
          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-60 transition">
            <RxCaretRight
              onClick={() => router.forward()}
              className="text-white"
              size={35}
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-60 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-60 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              {" "}
              <Button
                onClick={() => {
                  handleLogout();
                }}
                className="bg-white px-6 py-2 "
              >
                Logout
              </Button>
              <Button onClick={() => router.push("/account")} className="">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {
                    AuthModal.onOpen();
                  }}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    AuthModal.onOpen();
                  }}
                  className="bg-white px-6 py-2 font-medium"
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
