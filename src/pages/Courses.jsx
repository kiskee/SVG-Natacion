import { Link } from "react-router-dom";
import certificadoImg from "../assets/certificado.jpeg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Courses() {
  // body
  return (
    <>
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}

        <div className="relative py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Curso de Capacitación de Instructores y Entrenadores de
              <span className="block text-cyan-400 mt-2">Natación</span>
            </h1>
            <div className="flex flex-col items-center mb-6">
            <Link to="/courses-info">
              <Button className="w-auto bg-yellow-400 hover:bg-cyan-500 text-gray-900 font-bold py-2 px-4 rounded">
               Explora el Contenido de los cursos
              </Button>
              </Link>
            </div>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
              Programa integral diseñado para formar profesionales de la
              natación con los más altos estándares de calidad y conocimientos
              técnicos.
            </p>
          </div>
        </div>

        {/* Main Features */}
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Course Structure */}
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                  Estructura del Programa
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      6 Módulos completos de estudio para técnicos de Natación
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Formato 100% virtual a través de nuestra plataforma en
                      línea
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-300">
                        Programa dividido en tres niveles de especialización:
                      </span>
                      <ul className="mt-2 space-y-2 pl-6">
                        <li className="flex items-center space-x-2">
                          <Badge className="bg-cyan-500/20 text-cyan-400">
                            Nivel I
                          </Badge>
                          <span className="text-gray-400">
                            Instructor - 3 Módulos
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Badge className="bg-cyan-500/20 text-cyan-400">
                            Nivel II
                          </Badge>
                          <span className="text-gray-400">
                            Entrenador Infantil - 2 Módulos
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Badge className="bg-cyan-500/20 text-cyan-400">
                            Nivel III
                          </Badge>
                          <span className="text-gray-400">
                            Entrenador Juvenil y Mayores - 1 Módulo
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                  Beneficios del Programa
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Certificación oficial otorgada por Acuática Nelson Vargas,
                      México
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Flexibilidad para completar el programa a tu propio ritmo
                      (máximo 12 meses)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Material didáctico actualizado y basado en las últimas
                      investigaciones
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="container mx-auto px-6 py-12">
          <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                Características del Programa
              </h2>
              <div className="space-y-6 text-gray-300 text-center">
                <p>
                  El Programa de Capacitación está diseñado para estandarizar
                  niveles generales de conocimientos sobre el proceso de
                  enseñanza y formación de nadadores, con argumentos y conceptos
                  que se sustentan en las Ciencias Deportivas.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      12
                    </div>
                    <div className="text-sm text-gray-400">
                      Meses de duración máxima
                    </div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      6
                    </div>
                    <div className="text-sm text-gray-400">
                      Módulos de estudio
                    </div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      3
                    </div>
                    <div className="text-sm text-gray-400">
                      Niveles de certificación
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 m-6 ss:grid-cols-1"></div>
        {/* Certificate Preview */}
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <img
              src={certificadoImg}
              alt="Certificado de Acuática Nelson Vargas"
              width={600}
              height={800}
              className="mx-auto rounded-lg shadow-lg shadow-cyan-500/20"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mb-6">
        <Link to="/courses-info">
          <Button className="w-auto bg-yellow-400 hover:bg-cyan-500 text-gray-900 font-bold py-2 px-4 rounded">
            Explora el Contenido de los cursos
          </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
