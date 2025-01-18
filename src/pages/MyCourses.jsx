import Sidebar from "@/components/AppSidebar";
import ModuleService from "@/services/moduleService";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreateModuleForm from "@/components/forms/CreateModule";

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
          const response = await ModuleService.lessons.find({
            field: "title",
            value: activeComponent.trim(),
          });
          console.log(activeComponent.trim(), response);

          // setRenderMe(response || null); // Actualiza el estado con los datos o `null` si no hay resultados
        } catch (err) {
          console.error("Error al cargar datos:", err);
        }
      }
    };

    fetchData();
  }, [activeComponent]); // Vuelve a cargar si cambia `activeComponent`

  // Mapeamos los nombres a los componentes reales
  // switch (activeComponent) {
  //   case "Home":
  //     return <div className="flex-1 p-4 overflow-auto">
  //     <h1 className="text-5xl text-white text-center">Mis cursos</h1>
  //   </div>
  //   case "About":
  //     return <div className="flex-1 p-4 overflow-auto">
  //     <CreateModuleForm />
  //   </div>;

  //   default:
  //     return <div className="flex-1 p-4 overflow-auto">
  //     <h1 className="text-5xl text-white text-center">Mis cursos</h1>
  //   </div>
  // }
  //ModuleService.lessons.getById()
  const renderComponent = () => {
    console.log(activeComponent);
    if (activeComponent) {
      console.log(activeComponent);
      // const data = await ModuleService.lessons.find({field: "title", value: activeComponent })
      // console.log(data)
    } else {
      return (
        <div className="flex-1 p-4 overflow-auto">
          <h1 className="text-5xl text-white text-center">Mis cursos</h1>
        </div>
      );
    }
  };
  // body
  // ModuleService.userProgress
  //   .getAll()
  //   .then((progresses) => {
  //     console.log("UserProgress:", progresses);
  //   })
  //   .catch((error) => {
  //     console.error("Error al obtener UserProgress:", error);
  //   });

  // console.log("aca el detail", userDetail);

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
