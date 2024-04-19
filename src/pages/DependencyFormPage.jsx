import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDependencies } from "../context/DependenciesContext";
import { useEffect } from "react";

import { Form, FormField, FormControl, Label } from "@radix-ui/react-form";
import { Button, Flex, Card } from "@radix-ui/themes";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function DependencyFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createDependency, getDependency, updateDependency } =
    useDependencies();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadDependency = async () => {
      if (params.id) {
        const dependency = await getDependency(params.id);
        setValue("name", dependency.name);
        setValue("description", dependency.description);
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
    <Flex align="center" justify="center" className="h-[calc(100vh-300px)]">
      <Card className="max-w-md w-full p-10">
        <Form onSubmit={onSubmit}>
          <FormField>
            <Label htmlFor="name" className="block">
              Name
            </Label>
            <FormControl
              placeholder="Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
              className="w-full py-4 px-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              autoFocus
            />
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </FormField>
          <FormField>
            <Label htmlFor="description" className="block">
              Description
            </Label>
            <FormControl
              placeholder="Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "La descripción es requerida",
                },
              })}
              className="w-full py-4 px-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
            />
            {errors.description && (
              <span className="text-sm text-red-600">
                {errors.description.message}
              </span>
            )}
          </FormField>
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

export default DependencyFormPage;
