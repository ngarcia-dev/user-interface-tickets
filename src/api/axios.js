import axios from "axios";

const instance = axios.create({
  // TODO: Si es de pasar a production e de ingrear la ip del servidor donde se encuentra el backend
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
