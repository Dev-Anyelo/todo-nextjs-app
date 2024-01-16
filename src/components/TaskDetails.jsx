"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TaskDetails = ({ id, title, description, date, isCompleted }) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(isCompleted);

  const handleCompleted = () => {
    setCompleted(!completed);

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        isCompleted: !completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteTask = async () => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Se eliminó la tarea con ID: ", data.id);
    router.push("/");
    router.refresh();
  };

  return (
    <div
      className="p-4 rounded flex flex-col gap-3 mx-auto  w-full sm:max-w-4xl h-fit bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-Onest"
      // onClick={() => {
      //   router.push(`/edit/${id}`);
      // }}
    >
      <h1 className="sm:text-xl text-base text-slate-100">{title}</h1>
      <p className="sm:text-lg text-sm text-slate-300">{description}</p>
      <div className="flex justify-between sm:justify-end items-center w-full mt-3">
        <p
          onClick={handleCompleted}
          className="text-sm text-slate-400 w-fit sm:hidden hover:cursor-pointer"
        >
          {completed ? "✅ Completado" : "🕑 Pendiente"}
        </p>
        <p className="text-sm text-slate-400 w-fit">Creado el: {date}</p>
      </div>

      <div className="flex w-full flex-col sm:flex-row justify-between items-center gap-2 flex-wrap mt-3">
        <div className="w-fit hidden sm:block">
          <button
            type="button"
            onClick={handleCompleted}
            className={`${
              completed ? "bg-blue-800" : "bg-red-800 text-white"
            } text-white sm:py-2 sm:px-3 p-2 rounded text-sm sm:w-fit w-full`}
          >
            {completed ? "✅ Completado " : "🕑 Pendiente"}
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 flex-col sm:flex-row w-full sm:w-fit">
          <Link href="/" className="sm:w-fit w-full">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white sm:py-2 sm:px-3 p-2 rounded text-sm sm:w-fit w-full"
            >
              Regresar
            </button>
          </Link>
          <Link href={`/edit/${id}`} className="sm:w-fit w-full">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white sm:py-2 sm:px-3 p-2 rounded text-sm sm:w-fit w-full"
            >
              Editar
            </button>
          </Link>
          <button
            type="button"
            className="bg-red-800 hover:bg-red-900 text-white sm:py-2 sm:px-3 p-2 rounded text-sm sm:w-fit w-full"
            onClick={deleteTask}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
