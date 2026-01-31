import z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const SignInSchema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z.string({ message: "Campo obrigatório" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInValidationSchema = toTypedSchema(SignInSchema);
