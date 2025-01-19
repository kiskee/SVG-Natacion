import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For managing client-side routing
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Layaut from "./components/Layaut";
import Info from "./pages/Info";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";

export default function App() {
  return (
    <Router>
      <Layaut>
        <Analytics />
        <SpeedInsights />
        <Routes>
          {/* Define the route for the home page */}
          <Route path="/" element={<Home />} />
          {/* Define the route for the "Nosotros" page */}
          <Route path="/info" element={<Info />} />
          {/* Define the route for the "Proyectos" page */}
          <Route path="/register" element={<Register />} />

          <Route path="/courses" element={<Courses />} />

          <Route
            path="/my-courses"
            element={<ProtectedRoute element={<MyCourses />} />}
          />
        </Routes>
      </Layaut>
    </Router>
  );
}
