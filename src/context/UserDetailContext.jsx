import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crea el contexto
export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(() => {
    const storedUser = localStorage.getItem("userDetail");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      const { token, expiresAt } = JSON.parse(storedToken);
      const now = new Date().getTime();

      if (now < expiresAt) {
        return { ...JSON.parse(storedUser), token };
      } else {
        // Token expirado
        localStorage.removeItem("userDetail");
        localStorage.removeItem("authToken");
      }
    }

    return null;
  });

  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          token: userDetail.token,
          expiresAt: new Date().getTime() + 60 * 60 * 1000, // 60 minutos
        })
      );
    } else {
      localStorage.removeItem("userDetail");
      localStorage.removeItem("authToken");
    }
  }, [userDetail]);

  // Función personalizada para actualizar campos específicos de userDetail
  const updateUserDetail = (updatedFields) => {
    setUserDetail((prev) => {
      if (!prev) return null; // Si no hay usuario, no hacer nada

      const updatedUser = { ...prev, ...updatedFields };

      // Actualizar el localStorage solo con los campos enviados
      const storedUser = JSON.parse(localStorage.getItem("userDetail")) || {};
      localStorage.setItem(
        "userDetail",
        JSON.stringify({ ...storedUser, ...updatedFields })
      );

      return updatedUser;
    });
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        const { expiresAt } = JSON.parse(storedToken);
        const now = new Date().getTime();

        if (now >= expiresAt) {
          // Token expirado
          setUserDetail(null);
          localStorage.removeItem("userDetail");
          localStorage.removeItem("authToken");
          navigate("/", { replace: true }); // Redirige al inicio
        }
      }
    };

    // Verifica cada minuto si el token sigue siendo válido
    const interval = setInterval(checkTokenExpiration, 60 * 1000);

    // Verificación inicial al montar el componente
    checkTokenExpiration();

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <UserDetailContext.Provider
      value={{ userDetail, setUserDetail, updateUserDetail }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};
