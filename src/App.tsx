import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = (props: any) => {
  return <div className="App">{props.children}</div>;
};

export default App;
