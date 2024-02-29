"use client";

import AuthModel from "@/components/AuthModel";
import UploadModel from "@/components/UploadModel";

import { useEffect, useState } from "react";

export default function ModelProvider() {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModel />
      <UploadModel />
    </>
  );
}
