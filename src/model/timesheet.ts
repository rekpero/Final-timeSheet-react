import { IProjectInfo } from "./project";

export interface IProjectTimeSheet {
  id: number;
  project: IProjectInfo;
  phase: string;
  timeWorked: number;
  date: string;
  note: number;
}
