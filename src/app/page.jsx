import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

const loadTasks = async () => {
  // 1 => CONSULTANDO POR PETICIONES
  // const res = await fetch("http://localhost:3000/api/tasks");
  // const data = await res.json();
  // return data;

  // 2 => CONSULTADANDO DESDE LA BD con PRISMA
  return await prisma.task.findMany();
};

const Home = async () => {
  
  const tasks = await loadTasks();

  return (
    <main className="flex min-h-screen flex-col mx-auto Onest">
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
          tasks.map((task) => (
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
