import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm({ name: res.data.name, email: res.data.email, password: "" }))
      .catch(() => setMessage("Failed to load profile"));
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:4000/api/auth/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch {
      setMessage("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    await axios.delete("http://localhost:4000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="New Password (optional)"
          type="password"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Save Changes</button>
      </form>
      {message && <p className="text-center text-green-600 mt-3">{message}</p>}

      <button
        onClick={handleDelete}
        className="w-full mt-4 bg-red-500 text-white py-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
}
