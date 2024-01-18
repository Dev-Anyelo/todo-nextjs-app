"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import FilterTask from "@/components/FilterTask";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const loadTasks = async () => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/tasks"
      : `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`;

  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
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

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Delete tasks
  const handleDeleteTasks = async () => {
    const result = await Swal.fire({
      title: "Estás seguro?",
      text: "Todas las tareas se eliminarán permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar tareas",
      cancelButtonText: "Cancelar",
      color: "#fff",
      background: "#1f2937",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Tareas eliminadas!",
        text: "Las tareas se eliminaron correctamente.",
        icon: "success",
        color: "#fff",
        background: "#1f2937",
      });

      // Delete all tasks
      await fetch(`/api/tasks`, {
        method: "DELETE",
      });

      router.push("/");
      router.refresh();

      // Load and set tasks again after deletion
      const updatedTasks = await loadTasks();
      setTasks(updatedTasks);
    }
  };

  return (
    <main className="flex min-h-screen flex-col mx-auto Onest">
      <div className="flex justify-between items-center">
        <FilterTask onFilterChange={handleFilterChange} />
        {tasks && tasks.length > 0 && (
          <button
            type="button"
            className="bg-red-800 hover:bg-red-900 text-white sm:py-2 sm:px-3 p-2 rounded w-fit text-sm"
            onClick={handleDeleteTasks}
          >
            Eliminar tareas
          </button>
        )}
      </div>
      <div
        className={`w-full flex sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-5 flex-wrap max-w-8xl ${
          tasks.length === 0 ? "flex justify-center" : "justify-start"
        } items-center gap-3 `}
      >
        {tasks.length === 0 ? (
          <div className="flex h-[calc(100vh-20rem)] justify-center items-center gap-4 col-span-2 sm:text-center font-Onest">
            <h1 className="text-gray-600 text-2xl sm:text-4xl text-center">
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
