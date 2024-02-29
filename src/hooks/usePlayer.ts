import { create } from "zustand";

interface playertype {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<playertype>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => {
    set({ activeId: id });
  },
  setIds: (id: string[]) => {
    set({ ids: id });
  },
  reset: () => {
    set({ ids: [], activeId: undefined });
  },
}));

export default usePlayer;
