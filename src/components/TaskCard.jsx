"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Confetti from "react-confetti";

const TaskCard = ({ id, title, description, date, isCompleted }) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(isCompleted);
  const [confetti, setConfetti] = useState(false);

  const handleCompleted = () => {
    setCompleted(!completed);
    setConfetti(true);

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
    const result = await Swal.fire({
      title: "Estás seguro?",
      text: "Se eliminará permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar tarea",
      cancelButtonText: "Cancelar",
      color: "#fff",
      background: "#1f2937",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Tarea eliminada!",
        text: "La tarea se eliminó correctamente.",
        icon: "success",
        color: "#fff",
        background: "#1f2937",
      });

      // Delete task
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      {confetti && completed ? (
        <Confetti
          className="w-full h-full fixed top-0 left-0 z-50"
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
          initialVelocityY={10}
          friction={0.99}
          onConfettiComplete={() => setConfetti(false)}
        />
      ) : null}
      <div className="text-wrap p-4 rounded flex flex-col gap-3 w-full sm:w-[250px] h-fit bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-Onest">
        <h1 className="sm:text-xl text-base text-slate-100">{title}</h1>
        <p className="sm:text-lg text-sm text-slate-300 w-fit">{description}</p>
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
    </>
  );
};

export default TaskCard;
