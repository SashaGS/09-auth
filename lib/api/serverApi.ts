import { api } from "./api";
import {NotesResponse} from "@/types/note";


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

  const resp = await api.get<NotesResponse>("/notes", config);
  // console.log(tag);
  return resp.data;
};