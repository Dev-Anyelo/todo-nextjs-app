import { prisma } from "@/libs/prisma";
import TaskDetails from "@/components/TaskDetails";
import { Suspense } from "react";

const getTask = async (id) => {
 
  try {
    // 1 => CONSULTANDO POR PETICIONES
    // const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    // const data = await res.json();
    // return data;

    // 2 => CONSULTADANDO DESDE LA BD con PRISMA
    return await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const taskDetail = async ({ params }) => {
  const task = await getTask(params.id);

  return (
    <div>
      {!params.id || params === null ? (
        <div className="flex h-[calc(100vh-7rem)] justify-center items-center gap-4 col-span-2 sm:text-center font-Onest">
          <h1 className="text-gray-400 text-2xl sm:text-4xl text-center">
            No tienes tareas aún!
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold w-full h-fit text-center mb-5 font-Onest">
            Información de la tarea
          </h1>
          <Suspense fallback={<h1>Cargando Tarea...</h1>}>
            <TaskDetails
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
              date={new Date(task.createdAt).toLocaleDateString()}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default taskDetail;
