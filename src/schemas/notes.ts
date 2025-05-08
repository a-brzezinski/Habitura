import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(30, { message: "Title must be at most 30 characters long." }),
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 character long." })
    .max(1000, { message: "Content must be at most 1000 characters long." }),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;
