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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ModuleService from "@/services/moduleService";

const moduleSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido" }),
  description: z.string().optional(), // La descripción es opcional
  totalLessons: z.string().optional(), // La descripción es opcional
  finalExamId: z.string(),
  lessons: z.string().optional(), // Asumiendo que son ObjectIds de MongoDB y que debe haber al menos una lección
});

export default function CreateModuleForm() {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      description: "",
      totalLessons: "",
      finalExamId: "",
      lessons: "",
    },
  });

  async function onSubmit(values) {
    const module = values;
    module.lessons = values.lessons.split(",");
    module.totalLessons = Number(values.totalLessons);
    await ModuleService.modules.create(module);
  }
  // body
  return (
    <>
      <div className="bg-black text-white flex flex-col items-center justify-center gap-3 m-4">
        <h1 className="text-5xl text-white text-center">
          Crea un nuevo Modulo
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4 mr-4"
                    id="email-form-item"
                  >
                    <FormLabel className="text-right">Titulo</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="Modulo x"
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
                name="description"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4 mr-4"
                    id="nombre-form-item"
                  >
                    <FormLabel className="text-right">Descripcion</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="este mudolo contiene....."
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
                name="totalLessons"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4 mr-4"
                    id="apellidos-form-item"
                  >
                    <FormLabel className="text-right">
                      Total de lessiones
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="20 - 30"
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
                name="finalExamId"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4 mr-4"
                    id="usuario-form-item"
                  >
                    <FormLabel className="text-right">Examen Final</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="12365984418"
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
                name="lessons"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4 mr-4"
                    id="password-form-item"
                  >
                    <FormLabel className="text-right">Lessiones</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="12365984418, 123123423423,23423423423432"
                          className="w-2/3"
                          {...field}
                        />
                      </FormControl>

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
                Crear Modulo
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
