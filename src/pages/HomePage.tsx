import React from "react";
import MatchComponent from "./matches";
import Articles from "./news";
import Sidebar from "./sidebar";
import "./homepage.css"

function HomePage() {
  return (
    <div>
      <MatchComponent />
      <div className="flex content-class">
        <Articles />
        <Sidebar />
      </div>
    </div>
  );
}

export default HomePage;
