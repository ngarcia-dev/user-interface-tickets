import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDependencies } from "../context/DependenciesContext";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function DependencyFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createDependency, getDependency, updateDependency } =
    useDependencies();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadDependency = async () => {
      if (params.id) {
        const loadedDependency = await getDependency(params.id);
        console.log(loadedDependency);
        setValue("name", loadedDependency.name);
        setValue("description", loadedDependency.description);
      }
    };

    loadDependency();
  }, [params.id]);

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateDependency(params.id, dateValid);
    } else {
      createDependency(dateValid);
    }

    navigate("/dependencies");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            placeholder="description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default DependencyFormPage;
