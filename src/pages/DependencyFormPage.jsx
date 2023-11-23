import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDependencies } from "../context/DependenciesContext";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function DependencyFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createDependency, getDependency, updateDependency } =
    useDependencies();
  const navigate = useNavigate();
  const params = useParams();
  const [dependency, setDependency] = useState({ staff: [], services: [] });

  useEffect(() => {
    const loadDependency = async () => {
      if (params.id) {
        const loadedDependency = await getDependency(params.id);
        setDependency(loadedDependency);
        setValue("name", loadedDependency.name);
        setValue("email", loadedDependency.email);
        setValue("staff", loadedDependency.staff);
        setValue("services", loadedDependency.services);
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
          <label htmlFor="email">Email</label>
          <input
            required
            type="text"
            placeholder="Email"
            {...register("email")}
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            autoFocus
          />

          {/* Mapeamos el array de staff */}
          <label>Staff List</label>
          <ul className="bg-zinc-700 text-white px-4 py-4 rounded-md my-2">
            {dependency.staff.map((staffMember, index) => (
              <li key={index}>{staffMember.email}</li>
            ))}
          </ul>

          <label>Services List</label>
          <ul className="bg-zinc-700 text-white px-4 py-4 rounded-md my-2">
            {dependency.services.map((serviceCount, index) => (
              <li key={index}>{serviceCount.name}</li>
            ))}
          </ul>

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
