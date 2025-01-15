import { Button } from "@/components/ui/button";
import logo from '../assets/final.png'

export default function Header() {
  return (
    <header className="bg-black text-white shadow-lg w-full border-b border-cyan-400 border-opacity-60 ss:pb-4">
      <div className="container mx-auto  flex items-center justify-between md:flex-col sm:flex-col ss:flex-col md:justify-center md:mb-4">
        {/* Título */}
        <div className="flex items-center relative z-10 ss:flex-col my-4">
          <img
            src={logo}
            alt="EthLand Logo"
            style={{ height: 120, width: 200 }}
          />
          <h1
            className="text-3xl font-bold text-lime-600
            bg-clip-text 
            text-transparent 
            bg-gradient-to-r 
            from-cyan-400 
            to-blue-600 
            drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] sss:hidden ml-6"
          >
            SVG - Natacion
          </h1>
        </div>

        {/* Navegación */}

        <nav>
          <ul className="flex space-x-4 flex-row ss:flex-col ss:space-4 ss:text-center">
            <Button className="bg-black text-white">Ingresa</Button>
            <Button className="bg-cyan-600 text-white">Registrate</Button>
          </ul>
        </nav>
      </div>
    </header>
  );
}
