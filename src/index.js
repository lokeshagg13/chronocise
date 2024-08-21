import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ExerciseProvider>
    <Layout>
      <App />
    </Layout>
  </ExerciseProvider>
  // </React.StrictMode>
);
