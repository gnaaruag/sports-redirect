import ErrorBoundary from "../../components/ErrorBoundary.tsx";
import { SyncLoader } from "react-spinners";
import React, { Suspense } from "react";
import SidebarComponent from "./SidebarComponent";

function Sidebar() {
  return (
    <div>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="suspense-loading">
              <SyncLoader color="#3b82f6" size={10} />
            </div>
          }
        >
          <h1 className="font-bold text-xl">Favourites</h1>
          <SidebarComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Sidebar;
