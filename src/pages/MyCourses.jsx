import Sidebar from "@/components/AppSidebar";
import ModuleService from "@/services/moduleService";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateModuleForm from "@/components/forms/CreateModule";
import lessonsOne from "../static/lessonsOne.json";

export default function MyCourses() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [activeComponent, setActiveComponent] = useState(null);
  const [renderMe, setRenderMe] = useState(
    <div className="flex-1 p-4 overflow-auto">
      <h1 className="text-5xl text-white text-center">Mis cursos</h1>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (activeComponent) {
        try {
          const lesson = lessonsOne.find(
            (less) => less.title == activeComponent
          );
          if (lesson) {
            setRenderMe(
              <div className="flex-1 p-4 overflow-auto m-4 gap-4">
                <h1 className="text-5xl text-white text-center mb-8">
                  {lesson.title}
                </h1>
                <p className="text-white">{lesson.content.text}</p>
                <div className="flex flex-col items-center mt-8">
                  <Button className="bg-yellow-500 text-black text-xl">
                    Siguente Leccion
                  </Button>
                </div>
              </div>
            );
          }
        } catch (err) {
          console.error("Error al cargar datos:", err);
        }
      }
    };

    fetchData();
  }, [activeComponent]); // Vuelve a cargar si cambia `activeComponent`

  return (
    <>
      {userDetail.role != "admin" ? (
        <div className="flex flex-col items-center gap-4 m-8">
          <h2 className="text-5xl text-white">
            No Tienes ningun curso En el momento
          </h2>
          <Link to="/">
            <Button className="bg-yellow-500 text-black text-xl">
              Ve al Inicio
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex">
          <Sidebar setActiveComponent={setActiveComponent} />
          {renderMe}
        </div>
      )}
    </>
  );
}
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const [activeComponent, setActiveComponent] = useState(null);
//   const [modulesList, setModulesList] = useState([]); // Nueva estado para la lista de módulos
//   const [currentModuleIndex, setCurrentModuleIndex] = useState(0); // Nuevo estado para el índice actual
//   const [renderMe, setRenderMe] = useState(
//     <div className="flex-1 p-4 overflow-auto">
//       <h1 className="text-5xl text-white text-center">Mis cursos</h1>
//     </div>
//   );

//   // Función para manejar el cambio a la siguiente lección
//   const handleNextLesson = () => {
//     if (currentModuleIndex < modulesList.length - 1) {
//       const nextModule = modulesList[currentModuleIndex + 1];
//       setCurrentModuleIndex(currentModuleIndex + 1);
//       setActiveComponent(nextModule.title);
//     }
//   };

//   // Efecto para cargar la lista de módulos
//   useEffect(() => {
//     const loadModulesList = async () => {
//       try {
//         // Aquí deberías hacer la llamada a tu API para obtener la lista de módulos
//         // Este es un ejemplo, ajústalo según tu ModuleService
//         const modules = await ModuleService.modules.getAll() // Asume que existe este método
//         setModulesList(modules);
//       } catch (err) {
//         console.error("Error al cargar la lista de módulos:", err);
//       }
//     };

//     loadModulesList();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (activeComponent) {
//         try {
//           const response = await ModuleService.lessons.find({
//             field: "title",
//             value: activeComponent.trim(),
//           });
//           console.log(activeComponent.trim(), response);
//           if (response) {
//             setRenderMe(
//               <div className="flex-1 p-4 overflow-auto m-4 gap-4">
//                 <h1 className="text-5xl text-white text-center mb-8">
//                   {response.title}
//                 </h1>
//                 <p className="text-white">{response.content.text}</p>
//                 <div className="flex flex-col items-center mt-8">
//                   <Button
//                     className="bg-yellow-500 text-black text-xl"
//                     onClick={handleNextLesson}
//                     disabled={currentModuleIndex >= modulesList.length - 1}
//                   >
//                     {currentModuleIndex >= modulesList.length - 1
//                       ? "Curso Completado"
//                       : "Siguiente Lección"}
//                   </Button>
//                 </div>
//               </div>
//             );
//           }
//         } catch (err) {
//           console.error("Error al cargar datos:", err);
//         }
//       }
//     };

//     fetchData();
//   }, [activeComponent, currentModuleIndex, modulesList]);

//   // Efecto para actualizar el índice cuando cambia el componente activo
//   useEffect(() => {
//     const index = modulesList.findIndex(
//       module => module.title === activeComponent
//     );
//     if (index !== -1) {
//       setCurrentModuleIndex(index);
//     }
//   }, [activeComponent, modulesList]);

//   return (
//     <>
//       {userDetail.role != "admin" ? (
//         <div className="flex flex-col items-center gap-4 m-8">
//           <h2 className="text-5xl text-white">
//             No Tienes ningún curso En el momento
//           </h2>
//           <Link to="/">
//             <Button className="bg-yellow-500 text-black text-xl">
//               Ve al Inicio
//             </Button>
//           </Link>
//         </div>
//       ) : (
//         <div className="flex">
//           <Sidebar
//             setActiveComponent={setActiveComponent}
//           />
//           {renderMe}
//         </div>
//       )}
//     </>
//   );
// }
