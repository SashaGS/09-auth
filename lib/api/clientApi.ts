// import axios from "axios";
import { Note } from "@/types/note";
import { apilib } from "./api";
import { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  // username?: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search?: string,
  tag?: string,
  currentPage?: number,
): Promise<NotesResponse> => {
  const config = {
    //   headers: {
    //     accept: "application/json",
    //     // Authorization: `Bearer ${token}`,
    //   },
    params: {
      search: search,
      page: currentPage,
      // ВАЖЛИВО: якщо tag === "all" або undefined → не додаємо параметр
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  };

  const resp = await apilib.get<NotesResponse>("/notes", config);
  // console.log(tag);
  return resp.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  // const config = {
  //   headers: {
  //     accept: "application/json",
  //     // Authorization: `Bearer ${token}`,
  //   },
  // };
  const { data } = await apilib.get<Note>(`/notes/${id}`);
  return data;
};

export const addNote = async (
  noteData: Pick<Note, "title" | "content" | "tag">,
): Promise<Note> => {
  // const config = {
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const { data } = await apilib.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await apilib.delete<Note>(`/notes/${id}`, {
    // headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const register = async (data: RegisterRequest) => {
  const resp = await apilib.post<RegisterResponse>("/auth/register", data);
  return resp;
};

export const login = async (data: LoginRequest) => {
  const res = await apilib.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const getMe = async () => {
  const { data } = await apilib.get<User>("/auth/me");
  return data;
};

export async function updateMe(updatedData: Partial<User>): Promise<User> {
  const res = await apilib.put<User>("/users/me", updatedData, {
    withCredentials: true,
  });
  return res.data;
}

export const checkSession = async () => {
  const res = await apilib.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};
