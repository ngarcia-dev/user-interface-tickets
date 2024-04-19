import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Form, FormField, FormControl } from "@radix-ui/react-form";
import { Button, Flex, Card, Text } from "@radix-ui/themes";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tickets");
  }, [isAuthenticated]);

  return (
    <Flex align="center" justify="center" className="h-[calc(100vh-100px)]">
      <Card className="max-w-md w-full p-10">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <Text size="6" weight="bold">
          Login
        </Text>
        <Form onSubmit={onSubmit}>
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
              Login
            </Button>
          </Flex>
        </Form>
        <Text className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-sky-500">
            Sign up
          </Link>
        </Text>
      </Card>
    </Flex>
  );
}

export default LoginPage;
