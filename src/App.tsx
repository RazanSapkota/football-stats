import React from "react";
import Club from "./app/containers/club";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Club />
    </div>
  );
}

export default App;
