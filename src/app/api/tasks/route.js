import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

//Get all tasks
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

//Create a new task
export async function POST(request) {
  try {
    const { title, description } = await request.json();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error al crear una nueva tarea:", error);
    return NextResponse.json(
      { error: "No se pudo crear la tarea" },
      { status: 500 }
    );
  }
}

//Delete all tasks
export async function DELETE() {
  try {
    const task = await prisma.task.deleteMany();
    console.log("Se eliminaron TODAS las tareas");
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
