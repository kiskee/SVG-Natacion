import { useState, useContext, useEffect } from "react";
import { Camera, Upload } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModuleService from "@/services/moduleService";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Progress } from "@/components/ui/progress";
import CourseProgressCard from "@/components/CourseProgressCard ";

export default function UserProfile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    given_name: "",
    family_name: "",
  });

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "swim-blog"); // You'll need to replace this

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dumwnwsfh/image/upload`, // Replace YOUR_CLOUD_NAME
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(response, data)
        setImageUpload(data.url);
        setImageUrl(data.url)
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    };

  useEffect(() => {
    if (userDetail.id) {
      ModuleService.users
        .search(userDetail.id)
        .then((user) => {
          setUserData(user);
          setImageUrl(user.userData.picture);
          setFormData({
            name: user.userData.name || "",
            email: user.userData.email || "",
            given_name: user.userData.given_name || "",
            family_name: user.userData.family_name || "",
          });
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });
    }
  }, [userDetail.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para guardar los cambios
    console.log("Datos a guardar:", formData);
    if (imageUpload){
        formData.picture = imageUpload
    }
    await ModuleService.users.update(userDetail.id, formData)
  };

  const calculateProgress = (userProgress) => {
    if (!userProgress) return 0;
    return (
      (userProgress.completedLessons.length / userProgress.totalLessons) * 100
    );
  };
  // body
  return (
    <>
      <div className="min-h-screen inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent p-6">
        <Card className="max-w-2xl mx-auto bg-black text-white">
          <CardHeader>
            <h2 className="text-3xl font-bold text-center mb-4">
              Perfil de Usuario
            </h2>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-32 h-32 group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-cyan-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center border-4 border-cyan-500">
                    <Camera size={40} className="text-cyan-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-cyan-400 p-2 rounded-full cursor-pointer hover:bg-cyan-500 transition-colors">
                  <Upload size={20} className="text-gray-900" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={uploading}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Nombre</label>
                    <input
                      type="text"
                      name="given_name"
                      value={formData.given_name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Apellidos</label>
                    <input
                      type="text"
                      name="family_name"
                      value={formData.family_name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                    />
                  </div>
                </div>

                {userData?.userProgress && (
                 <CourseProgressCard userProgress={userData.userProgress} />
                )}

                <Button
                  type="submit"
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
