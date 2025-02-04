import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

export default function ChangePassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  console.log("aca el token famoso", token);
  // body
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
           aca tu token miralo {token}
          </h2>
        </div>
      </div>
    </>
  );
}
