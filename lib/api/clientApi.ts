// import axios from "axios";
import { Note } from "@/types/note";
import { apilib } from "./api";
import { User } from "@/types/user";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkZxdmFAdWtyLm5ldCIsImlhdCI6MTc4NjYyMjc0Mn0.jkg9S2Kty2N0FrvCg1GBSW9zCjuWvjxmxCLSEkC-ik8";
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}

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

export const addNote = async (
  noteData: Pick<Note, "title" | "content" | "tag">,
): Promise<Note> => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await apilib.post<Note>("/notes", noteData, config);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await apilib.delete<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const register = async () => {
  const { data } = await apilib.post("/auth/register", {
    email: " ",
  });
};

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const res = await apilib.post<LoginResponse>("/auth/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // щоб куки зберігались
  });

  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await apilib.get<User>("/users/me", {
    withCredentials: true,
  });
  return res.data;
}
