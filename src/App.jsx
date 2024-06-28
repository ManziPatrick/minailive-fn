import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageComparison from "./pages/face-recognation";
import IdCard from "./pages/idcard-recognition";
import FaceliveDashbord from "./pages/face-liveness-detection";
import EmotionsDashbord from "./pages/face-emotions-recognition";
import CreditCardDashbord from "./pages/credit-card-recognition";
import MrzDashbord from "./pages/mrz-barcode-recognition";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ImageComparison />} />
            <Route path="/id-card" element={<IdCard />} />
            <Route
              path="/face-liveness-detection"
              element={<FaceliveDashbord />}
            />
            <Route
              path="/face-emotions-recognition"
              element={<EmotionsDashbord />}
            />
            <Route
              path="/credit-card-recognition"
              element={<CreditCardDashbord />}
            />
            <Route path="/mrz-barcode-recognition" element={<MrzDashbord />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
