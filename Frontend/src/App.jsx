import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Singup from "./components/Singup.jsx";
import Singupvol from "./components/Singupvol.jsx";
import Singupngo from "./components/Singupngo.jsx";
import Login from "./components/Login.jsx";
import VOLdashboard from "./components/VOLdashboard.jsx";
import Reportanimal from "./components/Reportanimal.jsx";
import NGOdashboard from "./components/NGOdashboard.jsx";
// import NotFound from "./components/NotFound.jsx"; // Uncomment if 404 component is created

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/signupvol" element={<Singupvol />} />
      <Route path="/signupngo" element={<Singupngo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/voldashboard" element={<VOLdashboard />} />
      <Route path="/reportanimal" element={<Reportanimal />} />
      <Route path="/ngodashboard" element={<NGOdashboard />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;