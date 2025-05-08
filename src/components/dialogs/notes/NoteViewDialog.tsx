"use client";

import { Note } from "@prisma/client";
import { useState } from "react";

import { UpdateNoteForm } from "@/components/forms/notes/UpdateNoteForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const NoteViewDialog = ({ note }: { note: Note }) => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setEditMode(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex h-32 w-58 cursor-pointer flex-col justify-center rounded-md border p-4 shadow-sm transition-shadow hover:shadow-md">
        <h3 className="text-center text-lg font-semibold">{note.title}</h3>
      </DialogTrigger>
      <DialogContent>
        {editMode ? (
          <UpdateNoteForm cancelEditing={setEditMode} content={note.content} id={note.id} title={note.title} />
        ) : (
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">{note.title}</DialogTitle>
            <DialogDescription className="whitespace-pre-wrap">{note.content}</DialogDescription>
          </DialogHeader>
        )}
        <DialogFooter className="flex justify-end">
          {!editMode && (
            <Button className="px-8" onClick={() => setEditMode(true)}>
              Edit Note
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
