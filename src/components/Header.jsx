import React from "react";
import { Button } from "@/components/ui/button";
import logo from "../assets/final.png";
import { useState, useContext } from "react";
import SingInDialog from "./SingInDialog";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <header className="relative bg-black text-white w-full border-b border-cyan-500/60">
      {/* Background Pattern - matching hero section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto flex items-center justify-between md:flex-col sm:flex-col ss:flex-col md:justify-center md:mb-4 relative z-10">
        {/* Logo + Title */}
        <div className="flex items-center relative z-10 ss:flex-col my-4">
          <img
            src={logo}
            alt="EthLand Logo"
            style={{ height: 120, width: 200 }}
            className="relative z-10"
          />
          <h1
            className="text-3xl font-bold ml-6 sss:hidden
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r 
            from-cyan-400 
            to-blue-600 
            drop-shadow-[0_2px_4px_rgba(0,236,255,0.3)]"
          >
            SVG - Natacion
          </h1>
        </div>

        {/* Navigation */}
        <nav className="relative z-10">
          <ul className="flex space-x-4 flex-row ss:flex-col ss:space-4 ss:text-center ss:mb-4 ss:gap-y-2 ss:items-center sm:mb-4 ss:space-x-0">
            <Button
              className="bg-black/50 w-24 text-white border border-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/20 transition-colors"
              onClick={() => setOpenDialog(true)}
            >
              Ingresa
            </Button>
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 transition-colors w-24">
              Registrate
            </Button>
          </ul>
        </nav>
      </div>
      <SingInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </header>
  );
}
