import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export const registerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const diaryEntrySchema = z.object({
  date: z.string().min(1, { message: "A data é obrigatória" }),
  subject: z.string().min(1, { message: "A disciplina é obrigatória" }),
  numberOfClasses: z.coerce.number().positive({ message: "O número de aulas deve ser positivo" }),
  topic: z.string().min(1, { message: "O assunto é obrigatório" }),
  observations: z.string().optional(),
});
