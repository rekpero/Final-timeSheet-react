import React from "react";
import "./App.css";
import Dashboard from "./layout/dashboardcomponent";

const App: React.FC = (props: any) => {
  return <div className="App">{props.children}</div>;
};

export default App;
