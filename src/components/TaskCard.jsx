"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TaskCard = ({ id, title, description, date, isCompleted }) => {
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
      className="p-4 rounded flex flex-col gap-3 w-full sm:w-fit h-fit bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-Onest"
      // onClick={() => {
      //   router.push(`/edit/${id}`);
      // }}
    >
      <h1 className="sm:text-xl text-base text-slate-100">{title}</h1>
      <p className="sm:text-lg text-sm text-slate-300">{description}</p>
      <div className="flex justify-center sm:justify-end items-center mt-3">
        <p
          onClick={handleCompleted}
          className={`text-xs ${
            completed ? "bg-blue-800" : "bg-red-800"
          } rounded-md w-fit p-1 hover:cursor-pointer text-white`}
        >
          {completed ? "✅ Completado " : "🕑 Pendiente"}
        </p>
      </div>
      <div className="flex justify-center sm:justify-end items-center w-full">
        <p className="text-xs sm:text-sm text-slate-400 w-fit">
          <span className="hidden sm:inline">Creado el: </span> {date}
        </p>
      </div>

      <div className="flex w-full sm:justify-between justify-center items-center gap-2 flex-wrap mt-3">
        <Link href={`/task/${id}`} className="sm:w-fit w-full">
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white sm:py-2 sm:px-3 p-2 sm:w-fit w-full rounded text-sm"
          >
            Ver
          </button>
        </Link>
        <Link href={`/edit/${id}`} className="sm:w-fit w-full">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-900 text-white sm:py-2 sm:px-3 p-2 sm:w-fit w-full rounded text-sm"
          >
            Editar
          </button>
        </Link>
        <button
          type="button"
          className="bg-red-800 hover:bg-red-900 text-white sm:py-2 sm:px-3 p-2 rounded sm:w-fit w-full text-sm"
          onClick={deleteTask}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
