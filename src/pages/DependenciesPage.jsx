import { useEffect } from "react";
import { useDependencies } from "../context/DependenciesContext";
import DependenciesCard from "../components/DependenciesCard";

function DependenciesPage() {
  const { getDependencies, dependencies } = useDependencies();

  useEffect(() => {
    getDependencies();
  }, []);

  if (dependencies.length === 0) return <h1>No dependencies</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {dependencies.map((dependency) => (
        <DependenciesCard dependency={dependency} key={dependency._id} />
      ))}
    </div>
  );
}

export default DependenciesPage;