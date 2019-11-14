import React from "react";

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

class Dashboard extends React.Component<{}, IDashboardDataState> {
  constructor(props: any) {
    super(props);
    this.state = {
      project: [],
      phases: [],
      clients: [],
      timeSheet: []
    };
  }
  componentDidMount() {
    projectService
      .projectInfo()
      .subscribe((projectInfo: IProjectInfo[]) =>
        this.setState({ project: projectInfo })
      );
    projectService
      .clientData()
      .subscribe((clientData: IClientInfo[]) =>
        this.setState({ clients: clientData })
      );
    projectService
      .phasesInfo()
      .subscribe((phasesInfo: IPhasesInfo[]) =>
        this.setState({ phases: phasesInfo })
      );
    projectService
      .timeSheetData()
      .subscribe((timeSheetInfo: IProjectTimeSheet[]) =>
        this.setState({ timeSheet: timeSheetInfo })
      );
  }

  render() {
    return (
      <div>
        <VerticalTabs></VerticalTabs>
        <AppBarComponent
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
