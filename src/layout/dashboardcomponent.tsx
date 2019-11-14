import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerticalTabs from "../components/tabscomponent";
import AppBarComponent from "../components/appbarcomponent";
// import Chart from "../components/chartscomponent";

interface IDashboard {
  backgroundColor: string;
  activeColor: string;
  List1: Array<string>;
  List2: Array<string>;
}

class Dashboard extends React.Component<RouteComponentProps, IDashboard> {
  constructor(props: any) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      List1: ["Paras", "Kumar", "soni"],
      List2: ["Paras", "Kumar", "soni"]
    };
  }

  render() {
    return (
      <div>
        <VerticalTabs {...this.props}></VerticalTabs>
        <AppBarComponent></AppBarComponent>
      </div>
    );
  }
}

export default Dashboard;
