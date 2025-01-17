import Sidebar from "@/components/AppSidebar";
import ModuleService from '@/services/moduleService'

export default function MyCourses() {
  // body
  ModuleService.userProgress.getAll()
  .then((progresses) => {
    console.log('UserProgress:', progresses);
  })
  .catch((error) => {
    console.error('Error al obtener UserProgress:', error);
  });
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-5xl text-white text-center">Mis cursos</h1>
      </div>
    </div>
  );
}
