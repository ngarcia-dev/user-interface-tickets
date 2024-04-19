import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Form, FormField, FormControl } from "@radix-ui/react-form";
import { Button, Flex, Card, Text } from "@radix-ui/themes";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tickets");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Flex align="center" justify="center" className="h-[calc(100vh-100px)]">
      <Card className="max-w-md w-full p-10">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2" key={i}>
            {error}
          </div>
        ))}
        <Text size="6" weight="bold">
          Register
        </Text>
        <Form onSubmit={onSubmit}>
          <FormField>
            <FormControl
              type="text"
              {...register("username", { required: true })}
              className="w-full px-4 py-2 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              placeholder="Username"
            />
            {errors.username && (
              <Text className="text-red-500">Username is required</Text>
            )}
          </FormField>
          <FormField>
            <FormControl
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              placeholder="Email"
            />
            {errors.email && (
              <Text className="text-red-500">Email is required</Text>
            )}
          </FormField>
          <FormField>
            <FormControl
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              placeholder="Password"
            />
            {errors.password && (
              <Text className="text-red-500">Password is required</Text>
            )}
          </FormField>
          <Flex justify="start">
            <Button
              size="2"
              type="submit"
              className="hover:cursor-pointer w-32"
            >
              Register
            </Button>
          </Flex>
        </Form>

        <Text className="flex gap-x-2 justify-between">
          Alredy have an account?{" "}
          <Link to={"/login"} className="text-sky-500">
            Login
          </Link>
        </Text>
      </Card>
    </Flex>
  );
}

export default RegisterPage;
