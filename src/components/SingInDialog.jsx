import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/final.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { apiService } from "../services/apiService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Debe ser un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "La contraseña no puede tener más de 50 caracteres" })
    .regex(/^(?=.*[a-z])/, {
      message: "La contraseña debe incluir al menos una letra minúscula",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "La contraseña debe incluir al menos una letra mayúscula",
    })
    .regex(/^(?=.*\d)/, {
      message: "La contraseña debe incluir al menos un número",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message:
        "La contraseña debe incluir al menos un carácter especial (@$!%*?&)",
    }),
});

export default function SingInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const userInfo = await axios.get(
          import.meta.env.VITE_GOOGLE_SINGIN_URL,
          {
            headers: { Authorization: "Bearer " + tokenResponse?.access_token },
          }
        );

        const user = userInfo.data;

        // Enviar el login y obtener el JWT
        const login = await apiService.post("/auth/login-google", user);

        // Guardar en el estado y localStorage
        setUserDetail({
          ...login.user,
          token: login.accessToken, // Suponiendo que tu API devuelve el token como `jwtToken`
        });
        setIsLoading(false);
        closeDialog(false);
      } catch (error) {
        setError(error.message);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const user = values;
      const login = await apiService.post("/auth/login", user);
      setUserDetail({
        ...login.user,
        token: login.accessToken, // Suponiendo que tu API devuelve el token como `jwtToken`
      });
      setIsLoading(false);
      closeDialog(false);
    } catch (error) {
      setError(error.message);
    }
  }

  const OnRegister = () => {
    closeDialog(false);
    navigate("/register", { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // body
  return (
    <>
      <Dialog
        open={openDialog}
        onOpenChange={closeDialog}
        className="bg-white "
      >
        <DialogContent className="bg-black text-white flex flex-col items-center justify-center gap-3">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center">
              <p className="font-bold text-3xl text-center text-cyan-500">
                Continua con SVG - Natacion
              </p>{" "}
              <img
                src={logo}
                alt="EthLand Logo"
                style={{ height: 90, width: 150 }}
                className="relative z-10 mt-2"
              />
            </DialogTitle>
            {error ? (
              <h1 className="text-red-500 text-xl font-bold mt-8 text-center">
                {error}
              </h1>
            ) : (
              <DialogDescription className="mt-2 text-center text-xl text-white">
                Para usar SVG - Natacion deberas ingresar en una cuenta
                existente o crear una nueva
              </DialogDescription>
            )}
          </DialogHeader>
          
          {isLoading ? (<div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-500 mb-4 animate-pulse">
            Cargando tu perfil, gracias por tu paciencia...
            </h1>
            <div className="flex justify-center">
              {/* Spinner animado con Tailwind */}
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>) : (<>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      className="grid grid-cols-4 items-center gap-4 mr-4"
                      id="email-form-item"
                    >
                      <FormLabel className="text-right">Email</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="peduarte@me.com"
                            type="email"
                            className="w-2/3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem
                      className="grid grid-cols-4 items-center gap-4 mr-4"
                      id="password-form-item"
                    >
                      <FormLabel className="text-right">Contraseña</FormLabel>
                      <div className="col-span-3">
                        <div className="flex-row flex">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="w-2/3"
                              placeholder="Hello@123"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="ml-4"
                            aria-label={
                              showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-500" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                        </div>
                        <FormDescription className="text-xs mt-2">
                          Debe incluir mayúsculas, minúsculas, números y
                          caracteres especiales (@$!%*?&)
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center flex-col gap-4">
                <Button
                  type="submit"
                  className="bg-yellow-500 text-black text-xl w-2/3"
                >
                  Ingresar
                </Button>
              </div>
            </form>
          </Form>

          <Button
            className="bg-white text-black text-xl w-2/3 "
            onClick={googleLogin}
          >
            Entra con Google
          </Button>

          <Button
            onClick={OnRegister}
            className="bg-cyan-500 text-black text-xl w-2/3 "
          >
            Registrate
          </Button>
          </>)}
          
          <p className="text-xs">
            Al utilizar SVG - Natacion, acepta la recopilación de datos de uso
            para análisis
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
