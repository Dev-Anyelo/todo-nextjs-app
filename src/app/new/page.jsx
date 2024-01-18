"use client";

import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NewTask = ({ params }) => {
  
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`/api/tasks/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch task: ${res.status} ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    }
    router.refresh();
    router.push("/");
  };

  return (
    <div className="font-Onest sm:w-fit max-w-[436px] p-3 mx-auto rounded-md flex gap-4 sm:mt-5 md:mt-10 flex-col items-center justify-center bg-slate-900 border border-slate-800">
      <h1 className="font-Onest text-2xl md:text-4xl font-bold text-gray-200">
        {params.id ? "Editar Tarea" : "Crear Tarea"}
      </h1>
      <Form
        onSubmit={onSubmit}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        id={params.id}
      />
    </div>
  );
};

export default NewTask;
