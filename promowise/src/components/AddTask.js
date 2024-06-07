import React, { useState } from "react";

const AddTask = ({ setTasks }) => {
  const [inputTask, setInputTask] = useState("");

  const handleInputValue = (e) => {
    setInputTask(e.target.value);
  };

  const handleAddTask = (e) => {
    setTasks((prev) => [...prev, { taskName: inputTask, completed: false }]);
    setInputTask("");
  };
  return (
    <div className="flex mb-5">
      <input
        className="border border-gray-400 mr-2 px-4 py-2 flex-grow rounded"
        type="text"
        value={inputTask}
        placeholder="Add New Task"
        onChange={handleInputValue}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </div>
  );
};
export default AddTask;
