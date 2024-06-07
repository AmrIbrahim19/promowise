import { useState, useEffect } from "react";

const Tasks = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return false;
    });
    setFilteredTasks(filtered);
  }, [tasks, filter]);

  const handleStatus = (idx) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        index === idx ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };
  return (
    <>
      <h1 className="mr-4 font-bold pt-4">Filter Tasks :</h1>

      <div className="flex justify-center mb-4">
        <input
          type="radio"
          id="filter-all"
          name="filter"
          value="all"
          checked={filter === "all"}
          onChange={() => setFilter("all")}
        />
        <label className="ml-2 mr-4">All</label>
        <input
          type="radio"
          id="filter-active"
          name="filter"
          value="active"
          checked={filter === "active"}
          onChange={() => setFilter("active")}
        />
        <label className="ml-2 mr-4">Active</label>
        <input
          type="radio"
          id="filter-completed"
          name="filter"
          value="completed"
          checked={filter === "completed"}
          onChange={() => setFilter("completed")}
        />
        <label className="ml-2">Completed</label>
      </div>
      <ul className="pt-5">
        {filteredTasks.map((data, idx) => (
          <>
            <li className="p-2 flex justify-between mb-4" key={idx}>
              <input
                type="checkbox"
                checked={data.completed}
                onChange={() => handleStatus(idx)}
                className="w-5 h-5 border-gray-300 rounded"
              />
              <div className="rounded px-3 py-1 flex justify-between items-center w-80 bg-gray-200">
                <div>
                  <h1 className="text-gray-700 font-bold">Task Name</h1>
                  <p className="text-gray-700">{data.taskName}</p>
                </div>
                <div>
                  <div className="min-w-20">
                    <h1 className="text-gray-700 font-bold">Status</h1>
                    <span className="text-gray-700">
                      {data.completed ? "Completed" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="bg-red-500 text-white text-xs rounded h-6 mt-auto mb-auto px-2"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
