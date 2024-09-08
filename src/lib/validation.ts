import { z } from "zod";

export const sendResultsSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Preencha o email.").email("Email inválido."),
});

export type SendResultsValues = z.infer<typeof sendResultsSchema>;