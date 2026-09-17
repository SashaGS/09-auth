import { User } from "@/types/user";
import { apilib } from "./api";
import { NotesResponse, Note } from "@/types/note";
import { cookies } from "next/headers";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkZxdmFAdWtyLm5ldCIsImlhdCI6MTc4NjYyMjc0Mn0.jkg9S2Kty2N0FrvCg1GBSW9zCjuWvjxmxCLSEkC-ik8";

export const fetchNotes = async (
  search?: string,
  tag?: string,
  currentPage?: number,
): Promise<NotesResponse> => {
  // const config = {
  //   headers: {
  //     accept: "application/json",
  //     // Authorization: `Bearer ${token}`,
  //   },
  //   params: {
  //     search: search,
  //     // ВАЖЛИВО: якщо tag === "all" або undefined → не додаємо параметр
  //     ...(tag && tag !== "all" ? { tag } : {}),
  //     page: currentPage,
  //   },
  // };

  const resp = await apilib.get<NotesResponse>("/notes");
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

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  // console.log("Cookies in getMe:", cookieStore);
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
