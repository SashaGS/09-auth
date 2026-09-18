import axios from "axios";
// import { Note } from "@/types/note";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkZxdmFAdWtyLm5ldCIsImlhdCI6MTc4NjYyMjc0Mn0.jkg9S2Kty2N0FrvCg1GBSW9zCjuWvjxmxCLSEkC-ik8";

// const token = process.env.NEXT_PUBLIC_API_TOKEN;

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api/";
// const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const apilib = axios.create({
  baseURL,
  withCredentials: true, // підтримка cookies
});

// ////////////////////////////////////////////////////////////
