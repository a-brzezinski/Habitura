"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { deleteNote } from "@/actions/notes/delete-note";
import { updateNote } from "@/actions/notes/update-note";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { noteSchema, NoteSchemaType } from "@/schemas/notes";

interface CreateNoteFormProps {
  content: string;
  title: string;
  id: string;
  cancelEditing: (edit: boolean) => void;
}

export const UpdateNoteForm = ({ content, id, title, cancelEditing }: CreateNoteFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: title,
      content: content,
    },
  });

  function onSubmit(values: NoteSchemaType) {
    const { title, content } = values;
    startTransition(async () => {
      try {
        const response = await updateNote(id, title, content);
        if (response.status === "SUCCESS") {
          toast.success(response.message);
          cancelEditing(false);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to update note");
      }
    });
  }

  function handleDeleteNote() {
    startTransition(async () => {
      try {
        const response = await deleteNote(id);
        if (response.status === "SUCCESS") {
          toast.success(response.message);
          cancelEditing(false);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to delete note");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage className="mt-1 text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Content</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Enter content"
                  className="mt-1 block !h-[250px] w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage className="mt-1 text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 cursor-pointer rounded-md px-4 py-2"
            disabled={isPending}
            onClick={() => cancelEditing(false)}>
            Cancel Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteNote}
            className="flex-1 cursor-pointer rounded-md px-4 py-2">
            Delete
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
