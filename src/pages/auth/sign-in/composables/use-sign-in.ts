import { ref } from "vue";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { AuthApi } from "../../services/auth-api";
import {
  SignInValidationSchema,
  type SignInSchemaType,
} from "../types/sign-in.schema";

export function useSignInForm() {
  const { setToken } = useAuthStore();

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

    if (req.status === "error") {
      errorMessage.value = req.message;
      return;
    }

    const token = req.data?.token;

    if (!token) {
      return;
    }

    setToken(token);

    errorMessage.value = null;
  });

  return {
    email,
    password,
    handleSubmit: onSubmit,
    errorMessage,
    errors,
  };
}
