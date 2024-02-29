"use client";
import { MyUserContextProvider } from "@/hooks/useUser";

interface userProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: userProviderProps) {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
}
