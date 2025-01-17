import Sidebar from "@/components/AppSidebar";

export default function MyCourses() {
  // body
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-5xl text-white text-center">Mis cursos</h1>
      </div>
    </div>
  );
}
