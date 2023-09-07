import axios from "axios";
import qs from "qs";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
