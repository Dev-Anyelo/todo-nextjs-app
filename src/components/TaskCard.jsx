"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
      <div
        className={`text-wrap p-4 rounded flex flex-col gap-3 w-full h-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-Onest 
      ${completed && `opacity-60`}`}
      >
        <h1 className="sm:text-xl text-base text-slate-100">{title}</h1>
        <p className="sm:text-lg text-sm text-slate-300 w-full text-wrap h-full">
          {description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p
            onClick={handleCompleted}
            className={`text-xs ${
              completed ? "bg-blue-800" : "bg-red-800"
            } rounded-md w-fit p-1 hover:cursor-pointer text-white`}
          >
            {completed ? "✅ Completado " : "🕑 Pendiente"}
          </p>
          <div className="flex justify-center sm:justify-end items-center w-fit">
            <p className="text-xs sm:text-sm text-slate-400 w-fit">{date}</p>
          </div>
        </div>

        <div className="flex w-full justify-between items-center gap-2 flex-wrap mt-3">
          <Link href={`/task/${id}`} className="w-fit">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white sm:py-2 sm:px-3 p-2 sm:w-fit w-full rounded text-sm"
            >
              Ver
            </button>
          </Link>
          <Link href={`/edit/${id}`} className="w-fit">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white sm:py-2 sm:px-3 p-2 sm:w-fit w-full rounded text-sm"
            >
              Editar
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
