import axios from "./axios"

export const getDependenciesRequest = () => axios.get("/dependencies")

export const getDependencyRequest = (id) => axios.get(`/dependencies/${id}`)

export const createDependencyRequest = (dependency) => axios.post("/dependencies", dependency)

export const updateDependencyRequest = (id, dependency) => axios.put(`/dependencies/${id}`, dependency)

export const deleteDependencyRequest = (id) => axios.delete(`/dependencies/${id}`)