import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense, useContext } from "react";
import React from "react";
import { ThemeContext } from "./context/theme";
import { MatchesProvider } from "./context/matches/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <Suspense fallback={<>Loading...</>}>
        <MatchesProvider>
          <RouterProvider router={Router} />
        </MatchesProvider>
      </Suspense>
    </div>
  );
};
export default App;
