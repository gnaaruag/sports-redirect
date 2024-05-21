import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense, useContext } from "react";
import React from "react";
import { ThemeContext } from "./context/theme";


const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <Suspense fallback={<>Loading...</>}>
          <RouterProvider router={Router} />
      </Suspense>
    </div>
  );
};
export default App;
