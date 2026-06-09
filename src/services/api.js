import axios from "axios";

const api = axios.create({
  baseURL: "https://cricbuzz-cricket.p.rapidapi.com",

  headers: {
    "x-rapidapi-host":
      "cricbuzz-cricket.p.rapidapi.com",

    "x-rapidapi-key":
      import.meta.env.VITE_RAPIDAPI_KEY,
  },
});

export default api;