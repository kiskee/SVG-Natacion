import { Book, List } from "lucide-react";

export default function ModuleBlock({ moduleData }) {
  // body
  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6 inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent shadow-xl rounded-lg mb-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-cyan-500 mb-2">
            {moduleData.title}
          </h1>
          <p className="text-yellow-500 italic">
            Aprende y enseña natación con técnicas universales.
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-white text-justify leading-relaxed">
            {moduleData.description}
          </p>
        </div>

        {/* Lessons Section */}
        <div className="inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent p-4 rounded-lg shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <List className="mr-2 text-sky-500" />
              Lecciones ({moduleData.totalLessons})
            </h2>
            <span className="bg-sky-200 text-sky-800 text-sm px-3 py-1 rounded-full font-medium">
              Total: {moduleData.totalLessons} lecciones
            </span>
          </div>
          <ul className="list-disc list-inside space-y-2 text-white">
            {moduleData.lessons.map((lesson, index) => (
              <li
                key={index}
                className="flex items-start gap-2 border-l-4 border-sky-500 pl-3"
              >
                <Book className="text-white mt-1" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
