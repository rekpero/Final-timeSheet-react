/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

import { RouteComponentProps } from "react-router-dom";
import VerticalTabs from "../components/tabs";
import BottomAppBar from "../components/Appbar";
import Chart from "../components/charts";

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
        <VerticalTabs></VerticalTabs>
        <BottomAppBar></BottomAppBar>
        <div
          style={{ width: "20", paddingLeft: 500, float: "right" }}
          className="col-md-6 col-sm-6 py-3"
        >
          <Chart
            labels={["Project", "Project"]}
            chartData={[this.state.List1.length, this.state.List2.length]}
            color={["#28A745", "#DC3545"]}
            title={"Projects Progress"}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
