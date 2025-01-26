import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { motion } from "framer-motion";
import { BookOpen, Award, Clock } from "lucide-react";

export default function Hero() {
  const [activeModule, setActiveModule] = useState(null);

  const moduleDetails = [
    {
      title: "Conceptos Fundamentales",
      content:
        "Comprensión profunda de la natación infantil, sus etapas de desarrollo y principios pedagógicos.",
      topics: [
        "Natación en edades tempranas",
        "Desarrollo psicomotor",
        "Técnicas de enseñanza",
      ],
    },
    {
      title: "Desarrollo Técnico",
      content:
        "Formación en técnicas de nado, metodologías de entrenamiento y desarrollo infantil.",
      topics: [
        "Técnicas de nado competitivo",
        "Delfín subacuático",
        "Preparación física infantil",
      ],
    },
    {
      title: "Aspectos Formativos",
      content:
        "Enfoque en la formación integral del nadador, más allá del rendimiento deportivo.",
      topics: [
        "Formación de valores",
        "Prevención de lesiones",
        "Desarrollo psicológico",
      ],
    },
  ];
  const statsData = [
    {
      icon: <Award className="text-cyan-500" size={48} />,
      number: "500+",
      label: "Entrenadores Graduados",
    },
    {
      icon: <BookOpen className="text-cyan-500" size={48} />,
      number: "6",
      label: "Módulos de Estudio",
    },
    {
      icon: <Clock className="text-cyan-500" size={48} />,
      number: "10+",
      label: "Años de Experiencia",
    },
  ];

  // body
  return (
    <>
      <div className="relative bg-black min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"></div>

        <div className="relative container mx-auto px-4 py-16 flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Formación Profesional
              <span className="block text-cyan-500 mt-2">
                Entrenadores de Natación
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Programa de Certificación avalado por Acuática Nelson Vargas y
              diseñado por MSc. Sergio Valiente Gómez
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                {
                  to: "/register",
                  text: "Comenzar Ahora",
                  style: "bg-cyan-500 text-black",
                },
                {
                  to: "/info",
                  text: "Conoce Nuestro Mentor",
                  style: "border-2 border-cyan-500 text-white",
                },
                {
                  to: "/courses",
                  text: "Explora Módulos",
                  style: "bg-yellow-500 text-black",
                },
              ].map((btn, index) => (
                <motion.div
                  key={btn.text}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link
                    to={btn.to}
                    className={`
                    px-8 py-3 rounded-lg font-semibold 
                    transition-all duration-300 
                    hover:brightness-110
                    ${btn.style}
                  `}
                  >
                    {btn.text}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {moduleDetails.map((module, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setActiveModule(index)}
                  onHoverEnd={() => setActiveModule(null)}
                  className={`
                  p-6 rounded-lg border-2 transition-all duration-300
                  ${
                    activeModule === index
                      ? "bg-cyan-500/20 border-cyan-500"
                      : "bg-black/50 border-transparent"
                  }
                `}
                >
                  <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                    {module.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{module.content}</p>
                  <ul className="text-gray-400 list-disc list-inside">
                    {module.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 p-6 rounded-lg text-center"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-cyan-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
