import { IProjectInfo } from "./project";

export interface IProjectTimeSheet {
  id: number;
  project: IProjectInfo;
  phase: string;
  timeWorked: string;
  date: string;
  note: number;
}
