"use server";

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
//server actions CRUD

//read
export const getTodoListAction = async ({
  userId,
}: {
  userId: string | null;
}) => {
  try {
    return await prisma.todo.findMany({
      where: {
        user_id: userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
//create
export const createTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
  userId: string | null;
}) => {
  try {
    await prisma.todo.create({
      data: {
        title,
        body,
        completed,
        user_id: userId as string,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
//delete
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
};
//update
export const UpdateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: ITodo) => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        completed,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
