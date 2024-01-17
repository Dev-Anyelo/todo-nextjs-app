"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import FilterTask from "@/components/FilterTask";
import { useRouter } from "next/navigation";

const loadTasks = async () => {
  const res = await fetch(`http://localhost:3000/api/tasks`);
  const data = await res.json();
  return data;

  // return await prisma.task.findMany();
};

export const dynamic = "force-dynamic";

const Home = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Load tasks
  useEffect(() => {
    const fetchData = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
      applyFilter(loadedTasks, filter);
    };

    fetchData();
  }, [filter]);

  // Filter tasks
  const applyFilter = (tasks, filter) => {
    switch (filter) {
      case "pending":
        setFilteredTasks(tasks.filter((task) => !task.isCompleted));
        break;
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.isCompleted));
        break;
      default:
        setFilteredTasks(tasks);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const deleteTasks = async () => {
    const res = await fetch(`/api/tasks`, {
      method: "DELETE",
    });
    const data = await res.json();
    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col mx-auto Onest">
      <div className="flex justify-between items-center">
        <FilterTask onFilterChange={handleFilterChange} />
        {tasks && tasks.length > 0 && (
          <button
            type="button"
            className="bg-red-800 hover:bg-red-900 text-white sm:py-2 sm:px-3 p-2 rounded w-fit text-sm"
            onClick={deleteTasks}
          >
            Eliminar tareas
          </button>
        )}
      </div>
      <div
        className={`w-full grid grid-cols-2 sm:flex flex-wrap ${
          !tasks || tasks.length === 0 ? "justify-center" : "justify-start"
        } items-center gap-3`}
      >
        {!tasks || tasks.length === 0 ? (
          <div className="flex h-[calc(100vh-7rem)] justify-center items-center gap-4 col-span-2 sm:text-center font-Onest">
            <h1 className="text-gray-400 text-2xl sm:text-4xl text-center">
              No tienes tareas aún!
            </h1>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
              date={new Date(task.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
