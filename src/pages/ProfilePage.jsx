import { useEffect, useState } from "react";
import { profileRequest } from "../api/auth";

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
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form>
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            placeholder="Username"
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            value={profileData.username}
            readOnly
          />
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            value={profileData.email}
            readOnly
          />
          <label htmlFor="roles">Roles</label>
          <input
            required
            type="text"
            placeholder="Roles"
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            value={profileData.roles.map((role) => role.name).join(", ")}
            readOnly
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-2"
            value={profileData.password}
            readOnly
          />
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
