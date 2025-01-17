// components/Sidebar/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Home,
  BookOpen,
  User,
  Settings
} from 'lucide-react';
import logo from "../assets/final.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: 'Inicio', path: '/my-courses', icon: <Home size={20} /> },
    { title: 'Mis Cursos', path: '/my-courses/list', icon: <BookOpen size={20} /> },
    { title: 'Perfil', path: '/my-courses/profile', icon: <User size={20} /> },
    { title: 'Configuración', path: '/my-courses/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="relative">
      <div 
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } duration-300 h-screen inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent border-r-2 border-cyan-500 text-white p-5 pt-8 relative`}
      >
        <button
          className="absolute -right-3 top-9 w-7 h-7 bg-gray-900 rounded-full 
                     flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </button>

        <div className="flex gap-x-4 items-center">
          <img 
            src={logo} // Reemplaza con la ruta de tu logo
            className={`w-8 cursor-pointer duration-500 ${
              !isOpen && "rotate-[360deg]"
            }`}
          />
          <h1 className={`origin-left font-medium text-xl duration-200 ${
            !isOpen && "scale-0"
          }`}>
            Dashboard
          </h1>
        </div>

        <ul className="pt-6">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className={`flex items-center gap-x-4 p-2 hover:bg-gray-800 
                            rounded-md cursor-pointer`}>
                <span>{item.icon}</span>
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>
                  {item.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;