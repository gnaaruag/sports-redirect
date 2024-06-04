import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense, useContext } from "react";
import React from "react";
import { ThemeContext } from "./context/theme";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { Toaster } from "react-hot-toast";
import { PreferencesProvider } from "./context/preferences/context";
import { SportProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";

const App = () => {
  const theme = localStorage.getItem("theme");
  console.log("theme", theme);
  return (
    <div
      // className={` w-full mx-auto py-2 ${
      //   theme === "dark" ? "dark" : ""
      // }`}
    >
      <Toaster />
      <Suspense fallback={<>Loading...</>}>
        <PreferencesProvider>
          <SportProvider>
            <TeamsProvider>
              <ArticlesProvider>
                <MatchesProvider>
                  <RouterProvider router={Router} />
                </MatchesProvider>
              </ArticlesProvider>
            </TeamsProvider>
          </SportProvider>
        </PreferencesProvider>
      </Suspense>
    </div>
  );
};
export default App;
