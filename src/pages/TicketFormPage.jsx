import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";
import { useDependencies } from "../context/DependenciesContext";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TicketFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { createTicket, getTicket, updateTicket } = useTickets();

  const { getDependencies, dependencies } = useDependencies();
  const [dependencyDest, setDependencyDest] = useState(null);
  const [internalSecDest, setInternalSecDest] = useState(null);
  const [serviceItd, setServiceId] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTicket = async () => {
      if (params.id) {
        const ticket = await getTicket(params.id);
        setValue("title", ticket.title);
        setValue("description", ticket.description);
        setValue("dependencyDest", ticket.dependencyDestId);
        setValue("internalSecDest", ticket.internalSecDestId);
        setValue("serviceId", ticket.serviceProvidedId);
      }
    };

    getDependencies();
    loadTicket();
  }, []);

  useEffect(() => {
    setDependencyDest(
      dependencies.find(
        (dependency) => dependency.id === parseInt(watch("dependencyDest"))
      )
    );

    if (dependencyDest) {
      setInternalSecDest(
        dependencyDest.internalSec.find(
          (internalSec) => internalSec.id === parseInt(watch("internalSecDest"))
        )
      );
    }

    if (internalSecDest) {
      setServiceId(
        internalSecDest.service.find(
          (service) => service.id === parseInt(watch("serviceId"))
        )
      );
    }
  }, [
    watch("dependencyDest"),
    watch("internalSecDest"),
    watch("serviceId"),
    dependencyDest,
    internalSecDest,
  ]);

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTicket(params.id, dateValid);
    } else {
      createTicket(dateValid);
    }

    navigate("/tickets");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            placeholder="title"
            {...register("title", {
              required: {
                value: true,
                message: "No puede estar vacío",
              },
              minLength: {
                value: 5,
                message: "No menos de 5 caracteres",
              },
              maxLength: {
                value: 35,
                message: "No más de 35 caracteres",
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            autoFocus
          />
          {errors.title && (
            <span className="text-sm text-red-600">{errors.title.message}</span>
          )}
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
          />
          <label htmlFor="dependency" className="block">
            Dependency
          </label>
          <select
            id="dependencyDest"
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            {...register("dependencyDest", {
              required: { value: true, message: "Seleccione una Dependencia" },
            })}
          >
            <option value="">Selecciona una Dependencia</option>
            {dependencies.map((dependency) => (
              <option key={dependency.id} value={dependency.id}>
                {dependency.name}
              </option>
            ))}
          </select>
          {errors.dependencyDest && (
            <span className="text-sm text-red-600">
              {errors.dependencyDest.message}
            </span>
          )}

          {dependencyDest && (
            <>
              <label htmlFor="internalSecDest" className="block">
                Sector Interno
              </label>
              <select
                id="internalSecDest"
                className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
                {...register("internalSecDest", {
                  required: {
                    value: true,
                    message: "Seleccione un Sector Interno",
                  },
                })}
              >
                <option value="">Selecciona un Sector Interno</option>
                {dependencyDest.internalSec.map((internalSec) => (
                  <option key={internalSec.id} value={internalSec.id}>
                    {internalSec.name}
                  </option>
                ))}
              </select>
              {errors.internalSecDest && (
                <span className="text-sm text-red-600">
                  {errors.internalSecDest.message}
                </span>
              )}

              {internalSecDest && (
                <>
                  <label htmlFor="serviceId">Service</label>
                  <select
                    id="serviceId"
                    className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
                    {...register("serviceId", {
                      required: {
                        value: true,
                        message: "Seleccione un Servicio",
                      },
                    })}
                  >
                    <option value="">Selecciona un Servicio</option>
                    {internalSecDest.service.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.serviceId && (
                    <span className="text-sm text-red-600">
                      {errors.serviceId.message}
                    </span>
                  )}
                </>
              )}
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md block"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketFormPage;
