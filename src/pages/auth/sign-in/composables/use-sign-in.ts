import { ref } from "vue";
import router from "@/router";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { AuthApi } from "../../services/auth-api";
import {
  SignInValidationSchema,
  type SignInSchemaType,
} from "../types/sign-in.schema";

export function useSignInForm() {
  const { setTokens, setUser } = useAuthStore();

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
    const req = await AuthApi.signIn(values);

    if (!req.success) {
      errorMessage.value = "Usuário ou senha inválida.";
      return;
    }

    const { access_token, refresh_token } = req.data;

    if (!access_token) {
      return;
    }

    const profileReq = await AuthApi.getProfile(access_token);

    if (!profileReq.success) {
      errorMessage.value = "Erro ao obter perfil.";
      return;
    }

    if (profileReq.data.role !== "admin") {
      errorMessage.value = "Acesso restrito a administradores.";
      return;
    }

    setTokens(access_token, refresh_token);
    setUser(profileReq.data);

    errorMessage.value = null;

    router.push("/dashboard");
  });

  return {
    email,
    password,
    handleSubmit: onSubmit,
    errorMessage,
    errors,
  };
}
