import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { signup as signupUserAPI } from "../../services/authService";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUserAPI({ name, email, password, course, year });
      login(data); // login after signup
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating account. Email may already exist.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Course (e.g., B.Tech CSIT)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Year (e.g., 3rd Year)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mb-4 hover:bg-green-600">
          Signup
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
