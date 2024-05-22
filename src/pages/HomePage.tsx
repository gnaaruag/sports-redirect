import React from "react";
import MatchComponent from "./matches";
import Articles from "./news";
import Sidebar from "./sidebar";

function HomePage() {
  return (
    <div>
      <MatchComponent />
      <div className="flex">
        <Articles />
        <Sidebar />
      </div>
    </div>
  );
}

export default HomePage;
