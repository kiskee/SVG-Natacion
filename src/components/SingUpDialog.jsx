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

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Debe ser un email válido" }),
  nombre: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  apellidos: z.string()
    .min(2, { message: "Los apellidos deben tener al menos 2 caracteres" }),
  usuario: z.string()
    .min(3, { message: "El usuario debe tener al menos 3 caracteres" })
    .max(20, { message: "El usuario no puede tener más de 20 caracteres" }),
  password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "La contraseña no puede tener más de 50 caracteres" })
    .regex(/^(?=.*[a-z])/, { 
      message: "La contraseña debe incluir al menos una letra minúscula" 
    })
    .regex(/^(?=.*[A-Z])/, { 
      message: "La contraseña debe incluir al menos una letra mayúscula" 
    })
    .regex(/^(?=.*\d)/, { 
      message: "La contraseña debe incluir al menos un número" 
    })
    .regex(/^(?=.*[@$!%*?&])/, { 
      message: "La contraseña debe incluir al menos un carácter especial (@$!%*?&)" 
    })
});

export default function SingUpDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellidos: "",
      usuario: "",
      password: ""
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Email</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          placeholder="peduarte@me.com" 
                          type="email"
                          className="w-full" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Nombre</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          placeholder="Pedro" 
                          className="w-full" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Apellidos</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          placeholder="Duarte" 
                          className="w-full" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="usuario"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Usuario</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          placeholder="peduarte" 
                          className="w-full" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Contraseña</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          type="password" 
                          className="w-full"
                          placeholder="Hello@123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Debe incluir mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&)
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="bg-red-500 text-black text-xl">
                  Registrate
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>

          <Button
            className="bg-cyan-600 text-white text-xl rounded-lg"
            // onClick={googleLogin}
          >
            Ingresa Con Google
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

/*
<div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input id="username" type="email" className="col-span-3" placeHolder="peduarte@me.com"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
              Nombre
              </Label>
              <Input id="name" className="col-span-3" placeHolder="Pedro"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
              Apellidos
              </Label>
              <Input id="name" className="col-span-3" placeHolder="Duarte"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
              Usuario
              </Label>
              <Input id="name" className="col-span-3" placeHolder="peduarte"/>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Contraseña
              </Label>
              <Input id="username" type="password" className="col-span-3" placeHolder=""/>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-red-500 text-black text-xl">Registrate</Button>
            </DialogFooter>
          </div>
*/
