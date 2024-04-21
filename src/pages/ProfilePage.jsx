import { useEffect, useState } from "react";
import { profileRequest } from "../api/auth";

import { Form, FormField, FormControl, Label } from "@radix-ui/react-form";
import { Flex, Card } from "@radix-ui/themes";

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await profileRequest(); // Llama a la función de solicitud de perfil definida en axios.js
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <Flex align="center" justify="center" className="h-[calc(100vh-100px)]">
      <Card className="max-w-md w-full p-10">
        <Form>
          <FormField>
            <Label htmlFor="username" className="block">
              Username
            </Label>
            <FormControl
              type="text"
              placeholder="Username"
              className="w-full px-4 py-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              value={profileData.username}
              readOnly
            />
          </FormField>
          <FormField>
            <Label htmlFor="email" className="block">
              Email
            </Label>
            <FormControl
              type="email"
              placeholder="Email"
              className="w-full px-4 py-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              value={profileData.email}
              readOnly
            />
          </FormField>
          <FormField>
            <Label htmlFor="roles">Roles</Label>
            <FormControl
              type="text"
              placeholder="Roles"
              className="w-full px-4 py-4 my-2"
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
                border: "1px solid var(--gray-6)",
              }}
              value={profileData.role.map((role) => role.role.name)}
              readOnly
            />
          </FormField>
        </Form>
      </Card>
    </Flex>
  );
}

export default ProfilePage;
