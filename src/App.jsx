import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For managing client-side routing
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import Layaut from "./components/Layaut";
import Info from './pages/Info'
import Page2 from './pages/Page2'


export default function App() {
  return (
    <Router>
        <Layaut>
          <SpeedInsights />
          <Routes>
            {/* Define the route for the home page */}
            <Route path="/" element={<Home />} />
            {/* Define the route for the "Nosotros" page */}
            <Route path="/info" element={<Info />} />
            {/* Define the route for the "Proyectos" page */}
            <Route path="/page2" element={<Page2 />} />
          </Routes>
        </Layaut>
     
    </Router>
  );
}
