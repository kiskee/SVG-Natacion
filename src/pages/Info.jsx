import sergioImage from "../assets/sergio.png";

export default function Info() {
  // body
  return (
    <div className="bg-black text-white">
      {/* Biografía Section */}
      <div className="container mx-auto px-6 py-16">
        <section className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-wrap items-center">
            <div className="w-full md:w-3/12 lg:w-2/12 mx-auto md:mx-0">
              <div className="relative">
                {/* Decorative circle behind image */}
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl"></div>

                {/* Image container */}
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse"></div>
                  <img
                    src={sergioImage}
                    className="w-full h-full object-cover rounded-full border-4 border-cyan-500/30 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:border-cyan-400"
                    alt="Sergio Valiente Gómez"
                    width={192}
                    height={192}
                  />

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-9/12 lg:w-10/12 md:pl-8 mt-8 md:mt-0">
              <h2 className="text-3xl font-bold text-center md:text-left mb-6 text-cyan-500">
                Sergio Valiente Gómez
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="relative pl-4 border-l-2 border-cyan-500/30">
                  Sergio Valiente Gómez es un distinguido profesional en el
                  campo del deporte, específicamente en la natación. Nació el 14
                  de julio de 1944 y ha dedicado gran parte de su vida a la
                  formación y entrenamiento de nadadores de alto rendimiento.
                </p>
                <p className="relative pl-4 border-l-2 border-cyan-500/30">
                  Valiente Gómez ha ocupado diversas posiciones, desde
                  entrenador de enseñanza hasta director técnico nacional en
                  Cuba y la Federación Colombiana de Natación.
                </p>
                <p className="relative pl-4 border-l-2 border-cyan-500/30">
                  Además de su trabajo en el ámbito deportivo, Valiente Gómez ha
                  contribuido significativamente a la literatura y educación en
                  natación a través de numerosos artículos y publicaciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* El resto del componente permanece igual... */}
      {/* Estudios y Cursos Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Estudios Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-cyan-500 mb-4 text-center">
              Estudios medios y superiores
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-cyan-500 mr-2">•</span>
                Curso de formación de entrenadores en el Instituto Superior de
                Cultura Física de La Habana
              </li>
              <li className="flex items-center">
                <span className="text-cyan-500 mr-2">•</span>
                Licenciatura en el Instituto Superior de Cultura Física de La
                Habana, Cuba
              </li>
              <li className="flex items-center">
                <span className="text-cyan-500 mr-2">•</span>
                Master en Natación en el Instituto Superior Alemán de Cultura
                Física, Leipzig
              </li>
            </ul>
          </div>

          {/* Cursos Impartidos Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-cyan-500 mb-4 text-center">
              Cursos y Conferencias Impartidos
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-cyan-500 mr-2">•</span>
                Cursos de Capacitación en Brasil, Argentina, Chile, Bolivia,
                Perú, Paraguay, Colombia, Panamá, Nicaragua, Costa Rica,
                Guatemala, México
              </li>
              <li className="flex items-center">
                <span className="text-cyan-500 mr-2">•</span>
                Ponente en Congresos Técnicos Internacionales en España, Brasil,
                Argentina, Panamá, Puerto Rico, México y otros países
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actividades Internacionales */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-cyan-500 mb-4 text-center">
            Actividades en Organismos Deportivos Internacionales
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center">
              <span className="text-cyan-500 mr-2">•</span>
              Directivo del Comité Técnico y Comité Ejecutivo de la
              Confederación Centroamericana y del Caribe (1986-2006)
            </li>
            <li className="flex items-center">
              <span className="text-cyan-500 mr-2">•</span>
              Presidente del Comité Técnico de Natación de la PANAM ACUATICS
              (1995-1999)
            </li>
          </ul>
        </div>
      </div>

      {/* Trayectoria Timeline */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-cyan-500 mb-12">
          Trayectoria Laboral
        </h2>
        <div className="relative border-l-2 border-cyan-500/50 ml-6 space-y-8">
          {/* Timeline items */}
          <div className="relative pl-8">
            <div className="absolute -left-2 mt-2 w-4 h-4 rounded-full bg-cyan-500"></div>
            <p className="text-gray-300">
              Inició como entrenador de Enseñanza. Continuó como entrenador de
              equipos infantiles y juveniles. Entrenador de la Selección
              Nacional de Cuba.
            </p>
          </div>
          <div className="relative pl-8">
            <div className="absolute -left-2 mt-2 w-4 h-4 rounded-full bg-cyan-500"></div>
            <p className="text-gray-300">
              Director Técnico Nacional en Cuba (1978-2000). Director Técnico de
              la Federación Colombiana de Natación (2001-2017). Gerente de
              Equipos Acuática Nelson Vargas, México (2018-2022).
            </p>
          </div>
          <div className="relative pl-8">
            <div className="absolute -left-2 mt-2 w-4 h-4 rounded-full bg-cyan-500"></div>
            <p className="text-gray-300">
              Actualmente trabaja como independiente en asesorías y cursos de
              capacitación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
