import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  }, []);

  return (
    <div className="p-6 text-center">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">Welcome, {user.name} 🎉</h1>
          <p className="text-gray-600 mt-2">Email: {user.email}</p>
        </>
      ) : (
        <p className="text-red-500">Unauthorized. Please login again.</p>
      )}
    </div>
  );
}
