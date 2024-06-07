import React, { useState, useEffect } from "react";
import AddTask from "@/components/AddTask";
import Tasks from "@/components/Tasks";

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl text-center font-bold mb-4">Task Manager</h1>
      <AddTask tasks={tasks} setTasks={setTasks} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
