import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SingInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // body
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog} className="bg-white ">
      <DialogContent className="bg-black text-white flex flex-col items-center justify-center gap-3">
        <DialogHeader>
          <DialogTitle>
            <p className="font-bold text-3xl text-center text-cyan-500">
              Continua con SVG - Natacion
            </p>{" "}
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-xl">
            Para usar SVG - Natacion deberas ingresar en una cuenta existente o
            crear una nueva
          </DialogDescription>
        </DialogHeader>
        <Button
          className="bg-cyan-600 text-white text-xl rounded-lg"
          // onClick={googleLogin}
        >
          Ingresa Con Google
        </Button>
        <p className="text-xs">
          By using Body-form, you agree to the collection of usage data for
          analytics
        </p>
      </DialogContent>
    </Dialog>
  );
}
