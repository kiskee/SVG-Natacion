export default function ContentLesson({ title, content , handleNext, handlePrevius}) {
  return (
    <div className="p-8 bg-cyan-950 shadow-lg  border border-gray-800 hover:border-cyan-500/30 transition-colors duration-300">
      {/* <h1 className="text-3xl font-bold mb-6 text-white bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent">
        {title}
      </h1> */}
      <div className="space-y-6">
        {content.elements.map((element, index) => {
          switch (element.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed text-lg hover:text-gray-100 transition-colors duration-200"
                >
                  {element.text}
                </p>
              );
            case "image":
              return (
                <div key={index} className="relative group">
                  <img
                    src={element.src}
                    alt={element.alt}
                    className="w-full h-auto rounded-lg shadow-xl ring-1 ring-gray-800 group-hover:ring-cyan-500/50 transition-all duration-300 transform group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            case "orderedList":
              return (
                <ol
                  key={index}
                  className="list-decimal list-inside space-y-2 text-gray-300 pl-4"
                >
                  {element.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-cyan-400 transition-colors duration-200 marker:text-cyan-500"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              );
            case "unorderedList":
              return (
                <ul
                  key={index}
                  className="list-disc list-inside space-y-2 text-gray-300 pl-4"
                >
                  {element.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-cyan-400 transition-colors duration-200 marker:text-cyan-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "subtitle":
              return (
                <h1 className="text-4xl font-bold mb-6 text-yellow-500 text-center" key={index}>
                  {element.text}
                </h1>
              );
            default:
              return null;
          }
        })}
      </div>
      <div className="mt-8 flex justify-between">
        <button
         onClick={handlePrevius}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-300 disabled:opacity-50"
          //disabled={!onPrevious}
        >
          Lección Anterior
        </button>
        <button
        onClick={handleNext}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-300 disabled:opacity-50"
        //  disabled={!onNext}
        >
          Lección Siguiente
        </button>
      </div>
    </div>
  );
}

/**
 {
        type: "image",
        src: "https://example.com/image1.jpg",
        alt: "Niños nadando en una piscina"
      },
      {
        type: "orderedList",
        "items": [
          "Desarrollar confianza en el agua.",
          "Mejorar la salud cardiovascular.",
          "Promover hábitos de higiene."
        ]
      },

      {
          "type": "unorderedList",
          "items": [
            "Higiene y transparencia del agua de la piscina.",
            "Profundidad mínima de la piscina de enseñanza, que ofrezca confianza a los niños y a sus padres.",
            "Medios auxiliares, como flotadores, tablas y otros.",
            "Indicadores de profundidad alrededor de la piscina.",
            "Temperatura del agua, mínima de 25o C y máxima de 28o C.",
            "Apoyo en los vestidores para la disciplina durante los cambios de ropa.",
            "Un ambiente relajado, de orden, de la mayor estética posible.",
            "Evitar que observadores, incluidos familiares inmediatos, interrumpan la concentración de los principiantes, hasta donde ello sea posible. (En ninguna de las aulas de los colegios o universidades los padres pueden entrar a observar cómo se imparten las matemáticas u otra materia, mucho menos intervenir y hacer recomendaciones al respecto)."
          ]
        }
 */