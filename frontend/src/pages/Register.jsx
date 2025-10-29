import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" type="text" placeholder="Name" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" onChange={handleChange} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
      <p className="text-sm mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
}
