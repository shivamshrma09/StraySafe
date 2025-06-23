import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Singup from "./components/Singup.jsx";
import Singupvol from "./components/Singupvol.jsx";
import Singupngo from "./components/Singupngo.jsx";
import Login from "./components/Login.jsx";
import VOLdashboard from "./components/VOLdashboard.jsx";
import Reportanimal from "./components/Reportanimal.jsx";
import NGOdashboard from "./components/NGOdashboard.jsx";

// Note: 
// - Use exact component names as your actual files (case sensitive!)
// - If you use "Reportanimal", rename it to "ReportStrayForm" everywhere for consistency.

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/signupvol" element={<Singupvol />} />
      <Route path="/signupngo" element={<Singupngo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/voldashboard" element={<VOLdashboard />} />
      <Route path="/Reportanimal" element={<Reportanimal />} />
      <Route path="/ngodashboard" element={<NGOdashboard />} />
    </Routes>
  );
}

export default App;