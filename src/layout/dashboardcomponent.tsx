import React from "react";

import { RouteComponentProps } from "react-router-dom";
import VerticalTabs from "../components/tabscomponent";
import AppBarComponent from "../components/appbarcomponent";
import projectService from "../services/projectService";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";

interface IDashboardDataState {
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
}

class Dashboard extends React.Component<
  RouteComponentProps,
  IDashboardDataState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      project: [],
      phases: [],
      clients: [],
      timeSheet: []
    };
  }
  getProjectData = () => {
    projectService
      .projectInfo()
      .subscribe((projectInfo: IProjectInfo[]) =>
        this.setState({ project: projectInfo })
      );
  };
  getClientData = () => {
    projectService
      .clientData()
      .subscribe((clientData: IClientInfo[]) =>
        this.setState({ clients: clientData })
      );
  };
  getPhaseData = () => {
    projectService
      .phasesInfo()
      .subscribe((phasesInfo: IPhasesInfo[]) =>
        this.setState({ phases: phasesInfo })
      );
  };
  getTimeSheetData = () => {
    projectService
      .timeSheetData()
      .subscribe((timeSheetInfo: IProjectTimeSheet[]) =>
        this.setState({ timeSheet: timeSheetInfo })
      );
  };
  componentDidMount() {
    this.getClientData();
    this.getPhaseData();
    this.getProjectData();
    this.getTimeSheetData();
  }

  render() {
    return (
      <div>
        <VerticalTabs
          {...this.props}
          project={this.state.project}
          phases={this.state.phases}
          timeSheet={this.state.timeSheet}
          clients={this.state.clients}
          clientData={this.getClientData}
          projectData={this.getProjectData}
          phaseData={this.getPhaseData}
          timesheetData={this.getTimeSheetData}
        ></VerticalTabs>
        <AppBarComponent
          clientData={this.getClientData}
          projectData={this.getProjectData}
          phaseData={this.getPhaseData}
          timesheetData={this.getTimeSheetData}
          project={this.state.project}
          phases={this.state.phases}
          timeSheet={this.state.timeSheet}
          clients={this.state.clients}
        ></AppBarComponent>
      </div>
    );
  }
}

export default Dashboard;
