import Footer from "./Footer";
import Header from "./Header";
import { UserDetailProvider } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layaut({ children }) {
  // body
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE}>
      <UserDetailProvider>
        <div className="min-h-screen bg-black  flex flex-col ">
          {/* Encabezado con el logo y el título */}
          <Header />

          {/* Dynamic content passed as children */}
          <div className="">{children}</div>
          {/* Pie de página */}
          <Footer />
        </div>
      </UserDetailProvider>
    </GoogleOAuthProvider>
  );
}
