// import { AxiosError } from "axios";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

// export type ApiError = AxiosError<{ error: string }>;
