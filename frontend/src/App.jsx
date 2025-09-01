import { useState } from "react";
import Professionals from "./routes/professionals/Professionals";
import Accommodation from "./routes/accomodation/Accomodation";
import View from "./routes/viewing/viewing";
import Hire from "./routes/hire/Hire";
import Jobs from "./routes/jobs/Jobs";
import Dashboard from "./routes/admin/dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import { AdminProvider } from "./context/AdminContext";
import AdimAccomodation from "./routes/AdminAccomodation/AdminAccomodation";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AdminProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accomodation" element={<Accommodation />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/adminaccomodation" element={<AdimAccomodation />} />
          <Route path="/viewing" element={<View />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/admin/dashboard/*" element={<Dashboard />} />
        </Routes>
        {/*<Professionals />*/}
        {/*<Accommodation />*/}
      </div>
    </AdminProvider>
  );
}

export default App;
