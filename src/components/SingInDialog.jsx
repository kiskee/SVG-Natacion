import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
        closeDialog(false);
      } catch (error) {
        console.error("Error during login", error);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  async function onSubmit(values) {
    try {
      const user = values;
      const login = await apiService.post("/auth/login", user);
      setUserDetail({
        ...login.user,
        token: login.accessToken, // Suponiendo que tu API devuelve el token como `jwtToken`
      });
      closeDialog(false);
    } catch (error) {
      console.error("Error during login", error);
    }
  }

  const OnRegister = () => {
    closeDialog(false);
    navigate("/register", { replace: true });
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
            <DialogDescription className="mt-2 text-center text-xl text-white">
              Para usar SVG - Natacion deberas ingresar en una cuenta existente
              o crear una nueva
            </DialogDescription>
          </DialogHeader>
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
                        <FormControl>
                          <Input
                            type="password"
                            className="w-2/3"
                            placeholder="Hello@123"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
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
          <p className="text-xs">
            Al utilizar SVG - Natacion, acepta la recopilación de datos de uso
            para análisis
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
