import React from "react";
import "./App.css";

const App: React.FC = (props: any) => {
  return <div className="App">{props.children}</div>;
};

export default App;
