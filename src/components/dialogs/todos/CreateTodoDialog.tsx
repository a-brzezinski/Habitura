"use client";

import { useState } from "react";

import { CreateTodoForm } from "@/components/forms/todos/CreateTodoForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateTodoDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild variant="outline" className="w-full cursor-pointer lg:w-[200px]">
        <DialogTrigger>New Todo</DialogTrigger>
      </Button>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create todo</DialogTitle>
          <DialogDescription>Fill out the form below to create a new todo item.</DialogDescription>
        </DialogHeader>
        <CreateTodoForm closeModal={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
