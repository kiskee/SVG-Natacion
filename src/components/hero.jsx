import { Link } from "react-router-dom";

export default function Hero() {
  // body
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Formación Profesional de
          <span className="block text-cyan-500">Entrenadores de Natación</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Desarrolla tus habilidades y conviértete en un entrenador profesional
          de natación con nuestro programa especializado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
            Comenzar Ahora
          </button>
          <Link to="/info" className="px-8 py-3 border-2 border-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors">
            <button >
              Más Información
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-500/20">
            <div className="text-4xl font-bold text-cyan-500 mb-2">500+</div>
            <div className="text-gray-300">Entrenadores Graduados</div>
          </div>
          <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-500/20">
            <div className="text-4xl font-bold text-cyan-500 mb-2">95%</div>
            <div className="text-gray-300">Tasa de Empleabilidad</div>
          </div>
          <div className="p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-500/20">
            <div className="text-4xl font-bold text-cyan-500 mb-2">10+</div>
            <div className="text-gray-300">Años de Experiencia</div>
          </div>
        </div>
      </div>
    </div>
  );
}
