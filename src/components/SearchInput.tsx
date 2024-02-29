"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";

export default function SearchInput() {
  const router = useRouter();

  const [value, setValue] = useState<string>("");

  const debouncevalue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncevalue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncevalue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
