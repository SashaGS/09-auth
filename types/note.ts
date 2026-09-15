import { User } from "./user";

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

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   // username?: string;
// }

// export interface RegisterResponse {
//   user: User;
//   token: string;
// }
