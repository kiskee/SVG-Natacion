import { useContext, useState } from "react";
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

  function onSubmit(values) {
    console.log(values);
  }

  // body
  return (
    <>
      <div className="bg-black text-white flex flex-col items-center justify-center gap-3">
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
          <div className="mt-2 text-center text-xl text-white">
            Para usar SVG - Natacion deberas ingresar en una cuenta existente o
            crear una nueva
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem  className="grid grid-cols-4 items-center gap-4 mr-4" id="email-form-item">
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
                  </FormItem >
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 mr-4"  id="nombre-form-item">
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
                  <FormItem className="grid grid-cols-4 items-center gap-4 mr-4" id="apellidos-form-item">
                    <FormLabel className="text-right">Apellidos</FormLabel>
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
                  <FormItem className="grid grid-cols-4 items-center gap-4 mr-4" id="usuario-form-item">
                    <FormLabel className="text-right">Usuario</FormLabel>
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
                  <FormItem className="grid grid-cols-4 items-center gap-4 mr-4" id="password-form-item">
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
                className="bg-red-500 text-black text-xl w-2/3"
              >
                Registrate
              </Button>
              <Button
                className="bg-cyan-600 text-white text-xl w-2/3 "
                // onClick={googleLogin}
              >
                Registrate Con Google
              </Button>
              <p>ó</p>
              <Button onClick={() => setOpenSingINDialog(true)}
                className="bg-yellow-500 text-black text-xl w-2/3 ">
                  Inicia Session
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-xs">
          Al utilizar SVG - Natacion, acepta la recopilación de datos de uso
          para análisis
        </p>
        <SingInDialog
                openDialog={openSingINDialog}
                closeDialog={(v) => setOpenSingINDialog(v)}
              />
      </div>
    </>
  );
}
