import { prisma } from "@/libs/prisma";

export const loadTasks = async () => {
  return await prisma.task.findMany();
};
