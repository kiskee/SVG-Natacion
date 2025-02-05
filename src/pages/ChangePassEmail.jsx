
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Debe ser un email válido" }),
});

const LoadingSpinner = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-cyan-500 mb-4 animate-pulse">
      Validando la información, gracias por tu paciencia...
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

export default function ChangePassEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await ModuleService.password.find(values.email);
      setMessage(<Message type="cyan">{response.message}</Message>);
      form.reset();
    } catch (error) {
      setMessage(<Message type="red">{error.response.data.message}</Message>);
    }
    setIsLoading(false);
  };

  return (
    <div className="my-44 bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
          Restablecer Contraseña
        </h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-cyan-500 text-sm font-medium mb-2">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="usuario@ejemplo.com"
                          className="w-full px-3 py-2 bg-gray-800 border border-cyan-500 rounded-md text-yellow-500 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 text-black py-2 rounded-md font-semibold hover:bg-cyan-400 transition-colors duration-300"
                >
                  Enviar Instrucciones de Reseteo
                </Button>
                {message}
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
