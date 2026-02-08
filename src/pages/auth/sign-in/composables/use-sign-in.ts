import { ref } from "vue";
import router from "@/router";
import {
  SignInValidationSchema,
  type SignInSchemaType,
} from "../types/sign-in.schema";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/auth/auth.store";

export function useSignInForm() {
  const authStore = useAuthStore();

  const errorMessage = ref<string | null>(null);

  const { defineField, handleSubmit, errors } = useForm<SignInSchemaType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
  });

  const [email] = defineField("email");
  const [password] = defineField("password");

  const onSubmit = handleSubmit(async (values) => {
    const res = await authStore.signIn(values);

    if (!res.success) {
      errorMessage.value = mapError(res.error);
      return;
    }

    errorMessage.value = null;

    router.push("/dashboard");
  });

  return {
    email,
    errors,
    password,
    errorMessage,

    handleSubmit: onSubmit,
  };
}

function mapError(code?: string) {
  switch (code) {
    case "INVALID_CREDENTIALS":
      return "Usuário ou senha inválida.";
    case "FORBIDDEN":
      return "Acesso restrito a administradores.";
    case "PROFILE_ERROR":
      return "Erro ao obter perfil.";
    default:
      return "Erro inesperado.";
  }
}
