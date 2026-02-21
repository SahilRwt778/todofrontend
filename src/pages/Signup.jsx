import { useState } from "react";
import axios from "../api/axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/signup", form);
      toast.success("User Registered Successfully.")
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:text-white dark:bg-gray-800 p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input
          placeholder="Name"
          className="input"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          className="input"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="confirm Password"
          className="input"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button className="btn w-full mt-4 bg-blue-600 p-1.5 cursor-pointer">
          Signup
        </button>
        <p className="my-4">already have an account? <NavLink to={'/login'} className={"text-blue-600"}> Login</NavLink></p>

      </form>
    </div>
  );
};

export default Signup;