import { createContext, useContext, useState } from "react";
import {
  createDependencyRequest,
  deleteDependencyRequest,
  getDependencyRequest,
  getDependenciesRequest,
  updateDependencyRequest,
} from "../api/dependencies";

const DependencyContext = createContext();

export const useDependencies = () => {
  const context = useContext(DependencyContext);

  if (!context) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }

  return context;
};

export const DependencyProvider = ({ children }) => {
  const [dependencies, setDependencies] = useState([]);

  const getDependencies = async () => {
    try {
      const res = await getDependenciesRequest();
      setDependencies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createDependency = async (dependency) => {
    const res = await createDependencyRequest(dependency);
    console.log(res);
  };

  const deleteDependency = async (id) => {
    try {
      const res = await deleteDependencyRequest(id);
      if (res.status === 204)
        setDependencies(dependencies.filter((dependency) => dependency._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getDependency = async (id) => {
    try {
      const res = await getDependencyRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateDependency = async (id, dependency) => {
    try {
      await updateDependencyRequest(id, dependency);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DependencyContext.Provider
      value={{
        dependencies,
        getDependencies,
        createDependency,
        deleteDependency,
        getDependency,
        updateDependency,
      }}
    >
      {children}
    </DependencyContext.Provider>
  );
}