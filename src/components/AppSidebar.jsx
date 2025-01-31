// components/Sidebar/Sidebar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  User,
  Settings,
  Pyramid,
  Menu,
} from "lucide-react";
import logo from "../assets/final.png";
import { UserDetailContext } from "@/context/UserDetailContext";
import moduleOnex from "../static/moduleOne.json";

const Sidebar = ({ setActiveComponent }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [isOpen, setIsOpen] = useState(true);
  const [moduleData, setModuleData] = useState(null);
  const [moduleOne, setModuleOne] = useState(false);

  const menuItems = [
    { title: "Home", path: "/my-courses", icon: <Home size={20} /> },
    { title: "About", path: "/my-courses/list", icon: <BookOpen size={20} /> },
    { title: "Perfil", path: "/my-courses/profile", icon: <User size={20} /> },
    {
      title: "Configuración",
      path: "/my-courses/settings",
      icon: <Settings size={20} />,
    },
  ];

  const validModule = userDetail.modules.find(
    (module) => module.courseId == moduleOnex[0].id
  );

  return (
    <div className="relative">
      <div
        className={`${
          isOpen ? "w-72" : "w-24"
        } duration-300 h-screen inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent border-r-2 border-cyan-500 text-white p-5 pt-8 relative flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-9 w-7 h-7 bg-gray-900 rounded-full 
                   flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="w-12 h-6" />
          ) : (
            <ChevronRight className="w-12 h-6" />
          )}
        </button>

        {/* Header with Logo */}
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-8 cursor-pointer duration-500 ${
              !isOpen && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`origin-left font-medium text-xl duration-200 ${
              !isOpen && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mt-6 custom-scrollbar">
          <ul>
            {/* Dynamic Lessons Section */}
            {moduleOnex[0]?.lessons && moduleOne ? (
              <>
                <li
                  className="flex items-center text-yellow-400  text-xl gap-x-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  onClick={() => setModuleOne(!moduleOne)}
                >
                  <Menu color="cyan" />
                  <span
                    className={`${
                      !isOpen && "hidden"
                    } origin-left duration-200`}
                  >
                    Menu
                  </span>
                </li>
                <h2
                  className={`text-sm font-semibold text-gray-400 mt-6 ${
                    !isOpen && "hidden"
                  }`}
                >
                  Lecciones
                </h2>

                {moduleOnex[0].lessons.map((lesson, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-x-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                    onClick={() => setActiveComponent(lesson)}
                  >
                    <span className="text-xs text-gray-300">
                      {isOpen ? lesson : index + 1}
                    </span>
                  </li>
                ))}
              </>
            ) : (
              <>
              
                {userDetail.role == "admin" ||
                  (userDetail.role == "student" && validModule && (
                    <li
                      className="flex items-center text-yellow-400  text-xl gap-x-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                      onClick={() => setModuleOne(!moduleOne)}
                    >
                      <Pyramid color="cyan" />
                      <span
                        className={`${
                          !isOpen && "hidden"
                        } origin-left duration-200`}
                      >
                        Modulo 1
                      </span>
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
