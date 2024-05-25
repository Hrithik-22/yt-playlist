import axios from "axios";
const BASE_URL = "https://yt-playlist-ebon.vercel.app";
// const BASE_URL="http://localhost:8000";
// wdad
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
