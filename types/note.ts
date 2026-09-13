export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}
// export type NoteId = Note["id"];
