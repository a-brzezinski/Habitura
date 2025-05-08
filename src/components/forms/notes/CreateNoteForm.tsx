"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createNote } from "@/app/actions/notes/create-note";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { noteSchema, NoteSchemaType } from "@/schemas/notes";

interface CreateNoteFormProps {
  closeDialog: (open: boolean) => void;
}

export const CreateNoteForm = ({ closeDialog }: CreateNoteFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: NoteSchemaType) => {
    startTransition(async () => {
      try {
        const response = await createNote(values);
        if (response.status === "SUCCESS") {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to create note");
      } finally {
        form.reset();
        closeDialog(false);
      }
    });
  };

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
              <FormDescription className="text-sm text-gray-500">This is the title of your note.</FormDescription>
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
              <FormDescription className="text-sm text-gray-500">This is the content of your note.</FormDescription>
              <FormMessage className="mt-1 text-sm text-red-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
          {isPending ? "Creating..." : "Create Note"}
        </Button>
      </form>
    </Form>
  );
};
