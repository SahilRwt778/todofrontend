import axios from "../api/axios";
import { Link } from "react-router-dom";

const TodoItems = ({ todo, refresh, toggleTodo }) => {

  const deleteTodo = async () => {
    try {
      await axios.delete(`/todo/${todo._id}`);
      refresh();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const toggleComplete = async () => {
    try {
      await axios.patch(`/todo/${todo._id}`, {
        isCompleted: !todo.isCompleted,
      });
      refresh();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="text-white dark:bg-gray-800 p-4 rounded-xl shadow mb-3 flex justify-between items-center">
      <div>
        <h3
          className={`font-bold ${
            todo.isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </h3>

        <p className="text-sm text-gray-200">
          {todo.description}
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={toggleComplete}
          className="text-green-600 hover:scale-110 transition"
        >
          ✓
        </button>

        <Link
          to={`/edit/${todo._id}`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>

        <button
          onClick={deleteTodo}
          className="text-red-500 hover:scale-110 transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default TodoItems;