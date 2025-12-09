import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./components/PaginaPrincipal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;