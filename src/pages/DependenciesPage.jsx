import { useEffect } from "react";
import { useDependencies } from "../context/DependenciesContext";
import DependenciesCard from "../components/DependenciesCard";

import { Grid } from "@radix-ui/themes";

function DependenciesPage() {
  const { getDependencies, dependencies } = useDependencies();

  useEffect(() => {
    getDependencies();
  }, []);

  if (dependencies.length === 0) return <h1>No dependencies</h1>;

  return (
    <div>
      <Grid
        columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
        gap="3"
        width="auto"
      >
        {dependencies.map((dependency) => (
          <DependenciesCard dependency={dependency} key={dependency.id} />
        ))}
      </Grid>
    </div>
  );
}

export default DependenciesPage;
