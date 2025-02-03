import Sidebar from "@/components/AppSidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import lessonsOne from "../static/lessonsOne.json";
import ContentLesson from "@/components/ContentLesson";
import { motion } from "framer-motion";

export default function MyCourses() {
  const { userDetail } = useContext(UserDetailContext);
  const [activeComponent, setActiveComponent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState();
  const [renderMe, setRenderMe] = useState(
    <div className="flex-1 p-6 bg-black text-white min-h-screen overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-6xl font-bold text-cyan-500 mb-6">Mis Cursos</h1>
        <h2 className="text-4xl font-semibold mb-4">
          Módulo 1: Aprende y enseña natación
        </h2>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          La natación es una habilidad esencial que aporta beneficios para la
          salud, el bienestar y la calidad de vida. Este curso está diseñado
          para enseñar las técnicas universales de natación, enfocándose en
          niños de 6 y 7 años, pero adaptable a diferentes edades y niveles.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-left max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-3">
          Temas del Curso:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-300">
          <li>Conceptos sobre la natación infantil y las edades</li>
          <li>Grupos de edades y su función social y deportiva</li>
          <li>Principales fundamentaciones científicas</li>
          <li>Caracterización psicológica de los nadadores</li>
          <li>Consideraciones pedagógicas</li>
          <li>Técnicas en natación competitiva</li>
          <li>El Delfín Subacuático y su ejecución</li>
          <li>Experiencias técnicas en la preparación</li>
          <li>Calentamiento y regeneración</li>
          <li>Formación de valores en los nadadores</li>
          <li>Control médico deportivo y su importancia</li>
          <li>Planificación y cronología de tareas</li>
          <li>Glosario y bibliografía especializada</li>
        </ul>
      </motion.div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (activeComponent) {
        try {
          const currentIndexOne = lessonsOne.findIndex(
            (less) => less.title === activeComponent
          );
          setCurrentIndex(currentIndexOne);
          const lessonx = lessonsOne[currentIndexOne];
          if (lessonx) {
            setRenderMe(
              <ContentLesson
              leyend={lessonx.order}
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
      {userDetail.role === "admin" || userDetail.role === "student" ? (
        <div className="flex">
          <Sidebar setActiveComponent={setActiveComponent} />
          {renderMe}
        </div>
      ) : (
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
      )}
    </>
  );
}
