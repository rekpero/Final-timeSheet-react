import { IProjectInfo } from "./project";
import { IPhasesInfo } from "./phases";

export interface IProjectTimeSheet {
  id: number;
  project: IProjectInfo;
  phase: string;
  timeWorked: string;
  date: string;
  note: number;
}
