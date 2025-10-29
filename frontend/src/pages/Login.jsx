import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" onChange={handleChange} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="text-sm mt-3 text-center">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
}
