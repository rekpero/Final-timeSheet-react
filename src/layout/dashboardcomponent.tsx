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
  hours: number;
  minutes: number;
  timesheet: { id: number; project: string; phase: string };
  setTimer: boolean;
}

class Dashboard extends React.Component<RouteComponentProps, IDashboard> {
  intervalHandle: any;
  constructor(props: any) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      List1: ["Paras", "Kumar", "soni"],
      List2: ["Paras", "Kumar", "soni"],
      hours: 0,
      minutes: 0,
      timesheet: { id: 0, project: "", phase: "" },
      setTimer: false
    };
  }

  tick = () => {
    if (this.state.minutes === 0) {
      this.setState({ hours: this.state.hours - 1, minutes: 60 });
    }
    if (this.state.minutes === 0 && this.state.hours === 0) {
      clearInterval(this.intervalHandle);
    }
    this.setState({ minutes: this.state.minutes - 1 }, () =>
      console.log(this.state.hours, this.state.minutes)
    );
  };
  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 60000);
  };

  setTimer = (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => {
    if (this.state.setTimer) clearInterval(this.intervalHandle);
    this.setState({ hours, minutes, timesheet, setTimer: timer }, () =>
      this.startCountDown()
    );
  };

  setTimerFromModal = (hours: number, minutes: number, timer: boolean) => {
    if (this.state.setTimer) clearInterval(this.intervalHandle);
    this.setState({ hours, minutes, setTimer: timer }, () =>
      this.startCountDown()
    );
  };

  render() {
    return (
      <div>
        <VerticalTabs {...this.props} setTimer={this.setTimer}></VerticalTabs>
        <AppBarComponent
          setTimer={this.setTimerFromModal}
          hrs={this.state.hours}
          min={this.state.minutes}
          openTimer={this.state.setTimer}
        ></AppBarComponent>
      </div>
    );
  }
}

export default Dashboard;
