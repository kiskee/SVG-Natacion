import { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/final.png";
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
import SingInDialog from "./SingInDialog";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiService } from "../services/apiService";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Debe ser un email válido" }),
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  apellidos: z
    .string()
    .min(2, { message: "Los apellidos deben tener al menos 2 caracteres" }),
  usuario: z
    .string()
    .min(3, { message: "El usuario debe tener al menos 3 caracteres" })
    .max(20, { message: "El usuario no puede tener más de 20 caracteres" }),
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

export default function SingUpDialog() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openSingINDialog, setOpenSingINDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellidos: "",
      usuario: "",
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
        navigate("/", { replace: true });
      } catch (error) {
        setError(error);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const user = {
        email: values.email,
        family_name: values.apellidos,
        given_name: values.nombre,
        name: values.usuario,
        password: values.password,
      };
      const register = await apiService.post("/users", user);
      if (!register._id) {
        throw new Error("error durin register");
      }
      const loginParams = { email: values.email, password: values.password };
      const login = await apiService.post("/auth/login", loginParams);
      setUserDetail({
        ...login.user,
        token: login.accessToken, // Suponiendo que tu API devuelve el token como `jwtToken`
      });
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // body
  return (
    <>
      {userDetail ? (
        <div className="flex flex-col items-center gap-4 m-8">
          <h2 className="text-5xl text-white">
            Ya estas registrado en nuestra base datos!
          </h2>
          <Link to="/">
            <Button className="bg-yellow-500 text-black text-xl">
              Ve al Inicio
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-black text-white flex flex-col items-center justify-center gap-3 m-4">
            <div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-3xl text-center text-cyan-500">
                  Continua con SVG - Natacion
                </p>{" "}
                <img
                  src={logo}
                  alt="EthLand Logo"
                  style={{ height: 90, width: 150 }}
                  className="relative z-10 mt-2"
                />
              </div>

              {error ? (
                <h1 className="text-red-500 text-xl font-bold mt-8 text-center">
                  {error}
                </h1>
              ) : (
                <div className="mt-2 text-center text-xl text-white">
                  Para usar SVG - Natacion deberas ingresar en una cuenta
                  existente o crear una nueva
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="text-center mb-4">
                <h1 className="text-4xl font-bold text-cyan-500 mb-4 animate-pulse">
                  Cargando tu perfil, gracias por tu paciencia...
                </h1>
                <div className="flex justify-center">
                  {/* Spinner animado con Tailwind */}
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
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
                        name="nombre"
                        render={({ field }) => (
                          <FormItem
                            className="grid grid-cols-4 items-center gap-4 mr-4"
                            id="nombre-form-item"
                          >
                            <FormLabel className="text-right">Nombre</FormLabel>
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  placeholder="Pedro"
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
                        name="apellidos"
                        render={({ field }) => (
                          <FormItem
                            className="grid grid-cols-4 items-center gap-4 mr-4"
                            id="apellidos-form-item"
                          >
                            <FormLabel className="text-right">
                              Apellidos
                            </FormLabel>
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  placeholder="Duarte"
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
                        name="usuario"
                        render={({ field }) => (
                          <FormItem
                            className="grid grid-cols-4 items-center gap-4 mr-4"
                            id="usuario-form-item"
                          >
                            <FormLabel className="text-right">
                              Usuario
                            </FormLabel>
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  placeholder="peduarte"
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
                            <FormLabel className="text-right">
                              Contraseña
                            </FormLabel>
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
                        className="bg-cyan-500 text-black text-xl w-2/3"
                      >
                        Registrate
                      </Button>
                    </div>
                  </form>
                </Form>
                <Button
                  className="bg-white text-black text-xl w-2/3 "
                  onClick={googleLogin}
                >
                  Registrate Con Google
                </Button>

                <Button
                  onClick={() => setOpenSingINDialog(true)}
                  className="bg-yellow-500 text-black text-xl w-2/3 "
                >
                  Inicia Session
                </Button>
                <p className="text-xs">
                  Al utilizar SVG - Natacion, acepta la recopilación de datos de
                  uso para análisis
                </p>
                <SingInDialog
                  openDialog={openSingINDialog}
                  closeDialog={(v) => setOpenSingINDialog(v)}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
