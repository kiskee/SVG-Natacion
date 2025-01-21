import Sidebar from "@/components/AppSidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import lessonsOne from "../static/lessonsOne.json";
import ContentLesson from "@/components/ContentLesson";

export default function MyCourses() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [activeComponent, setActiveComponent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState();
  const [renderMe, setRenderMe] = useState(
    <div className="flex-1 p-4 overflow-auto">
      <h1 className="text-5xl text-white text-center">Mis cursos</h1>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (activeComponent) {
        console.log(activeComponent);
        try {
          const currentIndexOne = lessonsOne.findIndex(
            (less) => less.title === activeComponent
          );
          setCurrentIndex(currentIndexOne);
          const lessonx = lessonsOne[currentIndexOne];
          if (lessonx) {
            setRenderMe(
              <ContentLesson
                {...lessonx}
                handleNext={handleNext}
                handlePrevius={handlePrevius}
              />
            );
          }
        } catch (err) {
          console.error("Error al cargar datos:", err);
        }
      }
    };

    fetchData();
  }, [activeComponent, currentIndex]); // Vuelve a cargar si cambia `activeComponent`

  const handleNext = () => {
    const nextLesson = lessonsOne[currentIndex + 1];
    setActiveComponent(nextLesson.title);
  };

  const handlePrevius = () => {
    const nextLesson = lessonsOne[currentIndex - 1];
    setActiveComponent(nextLesson.title);
  };

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
