
import axios from "axios";
import { Note } from "@/types/note";
import { api } from "./api";


// interface NotesResponse {
//   notes: Note[];
//   totalPages?: number;
// }

// export const fetchNotes = async (
//   search?: string,
//   tag?: string,
//   currentPage?: number,
// ): Promise<NotesResponse> => {
//   const config = {
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       search: search,
//       // ВАЖЛИВО: якщо tag === "all" або undefined → не додаємо параметр
//       ...(tag && tag !== "all" ? { tag } : {}),
//       page: currentPage,
//     },
//   };

//   const resp = await api.get<NotesResponse>("/notes", config);
//   // console.log(tag);
//   return resp.data;
// };

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // params: {
    //   id: id,
    // },
  };
  const { data } = await api.get<Note>(`/notes/${id}`, config);
  return data;
};

export const addNote = async (
  noteData: Pick<Note, "title" | "content" | "tag">,
): Promise<Note> => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await api.post<Note>("/notes", noteData, config);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
