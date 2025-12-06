import { useState } from "react";
import axios from "axios";
import "./auth.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/register`;
      const res = await axios.post(url, form);

      setSuccess(res.data.message || "Registration successful!");
      setError("");

      // Backend does NOT return token → do not login automatically
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          name="phone_no"
          placeholder="Phone"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
