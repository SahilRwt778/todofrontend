import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("/todo/", form); // adjust if needed

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="text-white bg-gray-800 p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          Add Todo
        </h2>

        {error && (
          <p className="text-red-400 mb-3 text-sm">
            {error}
          </p>
        )}

        <input
          placeholder="Title"
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;