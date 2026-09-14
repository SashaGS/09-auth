import { apilib } from "./api";
import { NotesResponse, Note } from "@/types/note";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkZxdmFAdWtyLm5ldCIsImlhdCI6MTc4NjYyMjc0Mn0.jkg9S2Kty2N0FrvCg1GBSW9zCjuWvjxmxCLSEkC-ik8";

export const fetchNotes = async (
  search?: string,
  tag?: string,
  currentPage?: number,
): Promise<NotesResponse> => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: search,
      // ВАЖЛИВО: якщо tag === "all" або undefined → не додаємо параметр
      ...(tag && tag !== "all" ? { tag } : {}),
      page: currentPage,
    },
  };

  const resp = await apilib.get<NotesResponse>("/notes", config);
  // console.log(tag);
  return resp.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await apilib.get<Note>(`/notes/${id}`, config);
  return data;
};
