import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(30, { message: "Title must be at most 30 characters long." }),
  dueDate: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;
