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

export default function SingInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

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
        console.log("aca el usuario", user)
        // Enviar el login y obtener el JWT
        const login = await apiService.post("/auth/login", user);

        // Guardar en el estado y localStorage
        setUserDetail({
          ...user,
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
      console.log(user)
      // const login = await apiService.post("/auth/login", user);
      // setUserDetail({
      //   ...user,
      //   token: login.accessToken, // Suponiendo que tu API devuelve el token como `jwtToken`
      // });
    } catch (error) {
      console.error("Error during login", error);
    }
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Username
              </Label>
              <Input
                id="name"
                className="col-span-3"
                placeHolder="Pedro Duarte"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                id="username"
                type="email"
                className="col-span-3"
                placeHolder="peduarte@me.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Contraseña
              </Label>
              <Input
                id="username"
                type="password"
                className="col-span-3"
                placeHolder=""
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-yellow-500 text-black text-xl"
                onClick={onSubmit}
              >
                Ingresar
              </Button>
            </DialogFooter>
          </div>
          <Button
            className="bg-cyan-600 text-white text-xl rounded-lg"
            onClick={googleLogin}
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
