import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
    </Routes>
  );
}

export default App;
