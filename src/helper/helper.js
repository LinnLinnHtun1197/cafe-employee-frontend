import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: "http://localhost:8088/",
  headers: {
    "Content-Type": "application/json",
  },
});
