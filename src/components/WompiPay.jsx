import React, { useState } from "react";
import { Button } from "./ui/button";
import ModuleService from "@/services/moduleService";

export default function WompiPay({ currency, value }) {
  const [formData, setFormData] = useState(null); // Estado para los datos del formulario
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const handlePaymentClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Llamada al backend para obtener los datos
      const response = await ModuleService.singnature.create(value, currency);
      if (!response) {
        throw new Error("Error al obtener los datos del formulario");
      }

      setFormData(response);
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!formData ? (
        <>
          <div className="flex flex-col items-center mb-8">
            <Button
              onClick={handlePaymentClick}
              disabled={loading}
              className="bg-yellow-500 text-black text-xl"
            >
              {loading ? "Cargando..." : "Iniciar Pago"}
            </Button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center mb-8">
          <form action={import.meta.env.VITE_WOMPI_REDI} method="GET">
            <input
              type="hidden"
              name="public-key"
              value={import.meta.env.VITE_WOMPI_PUBLIC_KI}
            />
            <input type="hidden" name="currency" value={formData.currency} />
            <input
              type="hidden"
              name="amount-in-cents"
              value={formData.amountInCents}
            />
            <input type="hidden" name="reference" value={formData.reference} />
            <input
              type="hidden"
              name="signature:integrity"
              value={formData.signatureIntegrity}
            />
            {/* Campos opcionales */}

            <input
              type="hidden"
              name="redirect-url"
              value={import.meta.env.VITE_WOMPI_CHECKOUT}
            />

            <input
              type="hidden"
              name="expiration-time"
              value={formData.expirationTime}
            />

            <Button
              type="submit"
              className="bg-yellow-500 text-black text-xl w-auto"
            >
              Pagar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
