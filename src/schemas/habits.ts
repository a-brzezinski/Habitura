import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(3, { message: "Habit name must be at least 3 characters long." }),
  description: z
    .string()
    .max(50, { message: "Description must be at most 50 characters long." })
    .optional()
    .transform(val => (val === "" ? undefined : val)),
});

export type HabitSchemaType = z.infer<typeof habitSchema>;
