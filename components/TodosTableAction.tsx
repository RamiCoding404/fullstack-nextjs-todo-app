"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todoActions";
import Spinner from "./Spinner";
import EditTodoForm from "./EditTodoform";
import { ITodo } from "@/interfaces";

const TodosTableAction = ({ todo }: { todo: ITodo }) => {
  const [loading, setloading] = useState(false);
  return (
    <>
      <EditTodoForm todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setloading(true);
          await deleteTodoAction({ id: todo.id });
          setloading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={"16"} />}
      </Button>
    </>
  );
};

export default TodosTableAction;
