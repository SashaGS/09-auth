import { User } from "@/types/user";
import { apilib } from "./api";
import { NotesResponse, Note } from "@/types/note";
import { cookies } from "next/headers";

export const fetchNotes = async (
  search?: string,
  tag?: string,
  currentPage?: number,
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const resp = await apilib.get<NotesResponse>("/notes", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieHeader,
    },
  });
  return resp.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { data } = await apilib.get<Note>(`/notes/${id}`, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieHeader,
    },
  });
  return data;
};

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await apilib.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader, // додаємо cookies у headers
    },
  });
  return res.data;
}

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await apilib.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieHeader,
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};
