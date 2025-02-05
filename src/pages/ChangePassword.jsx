import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModuleService from "@/services/moduleService";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[A-Z]/, { message: "Debe contener al menos una mayúscula" })
      .regex(/[0-9]/, { message: "Debe contener al menos un número" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const LoadingSpinner = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-cyan-500 mb-4 animate-pulse">
      Actualizando contraseña...
    </h1>
    <div className="flex justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

const Message = ({ type, children }) => (
  <h1 className={`text-${type}-500 text-xl font-bold mt-8 text-center`}>
    {children}
  </h1>
);

export default function ChangePassword() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const newPassword = useWatch({ control: form.control, name: "newPassword" });
  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
  });
  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      form.setError("confirmPassword", {
        message: "Las contraseñas no coinciden",
      });
    } else {
      form.clearErrors("confirmPassword");
    }
  }, [newPassword, confirmPassword, form]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Simulación de respuesta exitosa
      const token = searchParams.get("token");
      const paramsToSend = {
        token,
        newPassword: values.confirmPassword,
      };
      await ModuleService.password.reset(paramsToSend);

      setMessage(
        <Message type="cyan">Contraseña actualizada exitosamente</Message>
      );
      form.reset();
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(
        <Message type="red">Error al actualizar la contraseña</Message>
      );
    }
    setIsLoading(false);
  };
  // body
  return (
    <>
      <div className="my-24 bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
            Nueva Contraseña
          </h2>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full"
              >
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-500 text-sm font-medium mb-2">
                          Nueva Contraseña
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md text-yellow-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cyan-500 text-sm font-medium mb-2">
                          Confirmar Contraseña
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirma tu nueva contraseña"
                            className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md text-yellow-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 text-black py-2 rounded-md font-semibold hover:bg-cyan-400"
                  >
                    Guardar Nueva Contraseña
                  </Button>
                  {message}
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
