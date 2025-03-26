import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DiaryEntry, DiaryState } from "@/types/diary";

const useDiaryStore = create<DiaryState>()(
  persist(
    (set, get) => ({
      entries: [],
      isLoading: false,

      addEntry: (entry) => {
        const newEntry: DiaryEntry = {
          ...entry,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          entries: [...state.entries, newEntry],
        }));
      },

      getEntries: () => {
        return get().entries;
      },

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        }));
      },

      updateEntry: (id, updatedEntry) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, ...updatedEntry } : entry
          ),
        }));
      },
    }),
    {
      name: "diary-storage",
    }
  )
);

export default useDiaryStore;
