import React from "react";
import { Button } from "@/components/ui/button";
import logo from "../assets/final.png";
import { useState, useContext } from "react";
import SingInDialog from "./SingInDialog";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { googleLogout } from "@react-oauth/google";


export default function Header() {
  const [openSingINDialog, setOpenSingINDialog] = useState(false);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onLogOut = () => {
    googleLogout(); // Cierra sesión de Google
    setUserDetail(null); // Limpia el contexto
    navigate("/", { replace: true }); // Redirige al inicio
  };
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
            <Link to="/"> SVG - Natacion</Link>
          </h1>
        </div>

        {/* Navigation */}
        { !userDetail ? (<nav className="relative z-10">
          <ul className="flex space-x-4 flex-row ss:flex-col ss:space-4 ss:text-center ss:mb-4 ss:gap-y-2 ss:items-center sm:mb-4 ss:space-x-0">
            <Button
              className="bg-black/50 w-24 text-white border border-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/20 transition-colors"
              onClick={() => setOpenSingINDialog(true)}
            >
              Ingresa
            </Button>
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 transition-colors w-24" onClick={() => setOpenSingUpDialog(true)}>
              
              <Link to="/register"> Registrate</Link>
            </Button>
          </ul>
        </nav>) : (<div className="flex flex-row">
           
           <DropdownMenu >
             <DropdownMenuTrigger asChild className="m-6">
               <Button className="bg-cyan-600 text-white">Menu</Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-24 bg-black flex items-center flex-col">
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
               <DropdownMenuItem className="bg-white m-2 hover:bg-lime-500">
                   <Link to="/" >Home</Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem className="bg-white m-2 hover:bg-lime-500">
                   <Link to="/page1">Full List</Link>
                 </DropdownMenuItem>
               </DropdownMenuGroup>
             </DropdownMenuContent>
           </DropdownMenu>

           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Avatar className="m-4">
                 <AvatarImage src={userDetail.picture} />
                 <AvatarFallback>{userDetail.given_name}</AvatarFallback>
               </Avatar>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56 bg-white">
               <DropdownMenuLabel>{userDetail.name}</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                 <DropdownMenuItem>Profile</DropdownMenuItem>
                 <DropdownMenuItem>Billing</DropdownMenuItem>
                 <DropdownMenuItem>Settings</DropdownMenuItem>
                 <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                 onClick={onLogOut}
                 className="bg-cyan-400 rounded"
               >
                 Log out
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>)}
      </div>
      <SingInDialog
        openDialog={openSingINDialog}
        closeDialog={(v) => setOpenSingINDialog(v)}
      />
      

    </header>
  );
}
