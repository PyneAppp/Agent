import { useState } from "react";
import Professionals from "./routes/professionals/Professionals";
import Accommodation from "./routes/accomodation/Accomodation";
import View from "./routes/viewing/viewing";
import { Routes, Route } from "react-router-dom";
import NavBar from "./routes/navBar/NavBar";
import Home from "./routes/Home/Home";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accomodation" element={<Accommodation />} />
          <Route path="/professionals" element={<Professionals />} />
        </Routes>
        {/*<Professionals />*/}
        {/*<Accommodation />*/}
      </div>
    </>
  );
}

export default App;
