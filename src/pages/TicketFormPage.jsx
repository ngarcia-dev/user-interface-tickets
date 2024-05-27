import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";
import { useDependencies } from "../context/DependenciesContext";
import { useEffect, useState } from "react";

import {
  Form,
  FormField,
  FormControl,
  Label,
  FormMessage,
} from "@radix-ui/react-form";
import { Button, Flex, Card, TextArea } from "@radix-ui/themes";

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
    <Flex align="center" justify="center" className="h-[calc(100vh-100px)]">
      <Card className="max-w-md w-full p-10">
        <Form onSubmit={onSubmit}>
          <FormField>
            <Label htmlFor="title" className="block">
              Title
            </Label>
            <FormControl
              type="text"
              placeholder="Title"
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
              className="w-full px-5 py-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-8)",
              }}
              autoFocus
            />
            {errors.title && (
              <span className="text-sm text-red-600">
                {errors.title.message}
              </span>
            )}
          </FormField>
          <FormField>
            <Label htmlFor="description" className="block">
              Description
            </Label>
            <TextArea
              rows="3"
              placeholder="Description"
              {...register("description")}
              className="w-full px-4 py-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
              }}
            />
          </FormField>
          <FormField>
            <Label htmlFor="dependency" className="block">
              Dependency
            </Label>
            <select
              id="dependencyDest"
              name="dependencyDest"
              className="w-full bg-zinc-800 text-white px-4 py-4 my-2"
              style={{
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-8)",
              }}
              {...register("dependencyDest", {
                required: {
                  value: true,
                  message: "Seleccione una Dependencia",
                },
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
              <FormMessage className="text-sm text-red-600">
                {errors.dependencyDest.message}
              </FormMessage>
            )}
          </FormField>

          {dependencyDest && (
            <>
              <FormField>
                <Label htmlFor="internalSecDest" className="block">
                  Sector Interno
                </Label>
                <select
                  id="internalSecDest"
                  name="internalSecDest"
                  className="w-full bg-zinc-800 text-white px-4 py-4 my-2"
                  style={{
                    borderRadius: "var(--radius-3)",
                    border: "1px solid var(--gray-8)",
                  }}
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
                  <FormMessage className="text-sm text-red-600">
                    {errors.internalSecDest.message}
                  </FormMessage>
                )}
              </FormField>

              {internalSecDest && (
                <>
                  <FormField>
                    <Label htmlFor="serviceId">Service</Label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      className="w-full bg-zinc-800 text-white px-4 py-4 my-2"
                      style={{
                        borderRadius: "var(--radius-3)",
                        border: "1px solid var(--gray-8)",
                      }}
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
                      <FormMessage className="text-sm text-red-600">
                        {errors.serviceId.message}
                      </FormMessage>
                    )}
                  </FormField>
                </>
              )}
            </>
          )}
          <Flex justify="start">
            <Button size="2" className="hover:cursor-pointer w-32">
              Save
            </Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}

export default TicketFormPage;
