import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import React from "react";

const App = () => {
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2`}
    >

            <Suspense fallback={<>Loading...</>}>
              <RouterProvider router={Router} />
            </Suspense>

    </div>
  );
};
export default App;