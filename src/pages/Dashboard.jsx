import { useEffect, useState } from "react";
import axios from "../api/axios";
import TodoItems from "../components/TodoItems";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/todo/?page=${page}&search=${search}`
      );
      setTodos(res.data.todos || []);
    } catch (err) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, search]);

  const markAllCompleted = async () => {
    try {
      await axios.patch("/todo/mark-all");
      toast.success("All tasks marked as completed ✅");
      fetchTodos();
    } catch (err) {
      toast.error("Failed to update tasks");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search..."
          className="w-full py-3 bg-gray-700 text-white px-5 rounded-md mr-3 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md whitespace-nowrap transition"
        >
          + Add Todo
        </Link>
      </div>

      {/* Mark All Button (Only Visible When Todos Exist) */}
      {todos.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={markAllCompleted}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            Mark All as Completed
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* Todo List */}
      {todos.map((todo) => (
        <TodoItems
          key={todo._id}
          todo={todo}
          refresh={fetchTodos}
        />
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          className="bg-blue-600 disabled:opacity-50 py-2 px-5 text-white rounded-md"
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <button
          disabled={todos.length === 0}
          className="bg-blue-600 disabled:opacity-50 py-2 px-5 text-white rounded-md"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;