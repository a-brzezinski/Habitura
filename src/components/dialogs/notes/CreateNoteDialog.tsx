"use client";

import { useState } from "react";

import { CreateNoteForm } from "@/components/forms/notes/CreateNoteForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateNoteDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild variant="outline" className="cursor-pointer">
        <DialogTrigger className="mt-4">New Note</DialogTrigger>
      </Button>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create your note</DialogTitle>
          <DialogDescription>Jot down your thoughts and save them for later.</DialogDescription>
        </DialogHeader>
        <CreateNoteForm closeDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
