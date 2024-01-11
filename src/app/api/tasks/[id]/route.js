import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

//Get task by id
export async function GET(request, {params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(task);
}

//Update task by id
export async function PUT(request, { params }) {
  const data = await request.json();

  const task = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });

  return NextResponse.json(task);
}

//Delete task by id
export async function DELETE(request,{ params }) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
