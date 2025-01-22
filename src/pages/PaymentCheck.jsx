import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModuleService from "@/services/moduleService";

export default function PaymentCheck() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trasactionData, setTrasactionData] = useState(null);
  const navigate = useNavigate();

  // Obtén los parámetros de la URL
  const id = searchParams.get("id");

  useEffect(() => {
    // Simula una operación asíncrona (como una llamada a una API)
    const simulateComputation = async () => {
      // Simula un retraso de 3 segundos
      const trasactionDataCall = await ModuleService.trasactions.find({
        field: "data.transaction.id",
        value: id,
      });

      setTrasactionData(trasactionDataCall);

      // relacionar el usuario y crear el modulo

      await new Promise((resolve) => setTimeout(resolve, 3000));
      // Finaliza la carga
      setIsLoading(false);
    };

    simulateComputation();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente
  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path);
  };
  // body
  return (
    <>
      <div className="min-h-screen inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent text-white flex items-center justify-center p-4">
        {isLoading ? (
          // Estado de carga
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-500 mb-4 animate-pulse">
              Procesando parámetros de pago...
            </h1>
            <div className="flex justify-center">
              {/* Spinner animado con Tailwind */}
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          // Contenido final
          <div className="w-full max-w-6xl grid grid-cols-2 ss:grid-cols-1 gap-8">
            {/* Columna izquierda: Detalles de la transacción */}
            <div className="bg-gray-500 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold text-cyan-500 mb-6 text-center">
                Pago procesado con éxito
              </h1>

              {/* Detalles de la transacción */}
              <div className="space-y-6">
                {/* Estado de la transacción */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                    Estado
                  </h2>
                  <p className="text-lg text-gray-300">
                    {trasactionData.data.transaction.status === "APPROVED" ? (
                      <span className="text-green-500">Aprobado</span>
                    ) : (
                      <span className="text-red-500">Rechazado</span>
                    )}
                  </p>
                </div>

                {/* Monto y moneda */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                    Monto
                  </h2>
                  <p className="text-lg text-gray-300">
                    {(
                      trasactionData.data.transaction.amount_in_cents / 100
                    ).toLocaleString("es-CO", {
                      style: "currency",
                      currency: trasactionData.data.transaction.currency,
                    })}
                  </p>
                </div>

                {/* Método de pago */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                    Método de pago
                  </h2>
                  <p className="text-lg text-gray-300">
                    {trasactionData.data.transaction.payment_method.type}
                  </p>
                  <p className="text-gray-400">
                    Teléfono:{" "}
                    {
                      trasactionData.data.transaction.payment_method
                        .phone_number
                    }
                  </p>
                </div>

                {/* Información del cliente */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                    Cliente
                  </h2>
                  <p className="text-lg text-gray-300">
                    {trasactionData.data.transaction.customer_data.full_name}
                  </p>
                  <p className="text-gray-400">
                    Email: {trasactionData.data.transaction.customer_email}
                  </p>
                  <p className="text-gray-400">
                    Teléfono:{" "}
                    {trasactionData.data.transaction.customer_data.phone_number}
                  </p>
                </div>

                {/* Fechas */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                    Fechas
                  </h2>
                  <p className="text-gray-300">
                    <span className="font-semibold">Creada:</span>{" "}
                    {new Date(
                      trasactionData.data.transaction.created_at
                    ).toLocaleString()}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Finalizada:</span>{" "}
                    {new Date(
                      trasactionData.data.transaction.finalized_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha: Botones de acción */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center space-y-6">
              <button
                onClick={() => handleNavigation("/my-courses")}
                className="w-full bg-cyan-500 text-black text-2xl font-bold py-4 rounded-lg hover:bg-cyan-600 transition duration-300"
              >
                Comenzar Módulo 1
              </button>
              <button
                onClick={() => handleNavigation("/profile")}
                className="w-full bg-cyan-500 text-black text-2xl font-bold py-4 rounded-lg hover:bg-cyan-600 transition duration-300"
              >
                Ir a Perfil
              </button>
              <button
                onClick={() => handleNavigation("/")}
                className="w-full bg-cyan-500 text-black text-2xl font-bold py-4 rounded-lg hover:bg-cyan-600 transition duration-300"
              >
                Inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
