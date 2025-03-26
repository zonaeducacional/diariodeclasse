export interface DiaryEntry {
  id: string;
  date: string;
  professor: string;
  professorId: string;
  subject: string;
  numberOfClasses: number;
  topic: string;
  observations?: string;
  createdAt: string;
}

export interface DiaryState {
  entries: DiaryEntry[];
  isLoading: boolean;
  addEntry: (entry: Omit<DiaryEntry, "id" | "createdAt">) => void;
  getEntries: () => DiaryEntry[];
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => void;
}
