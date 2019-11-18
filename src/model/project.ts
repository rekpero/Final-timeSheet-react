import { IPhasesInfo } from "./phases";

export interface IProjectInfo {
  id: number;
  name: string;
  projectColor: string;
  clientId: number;
  members: { name: string; hourlyrate: string };
  phases: IPhasesInfo[];
  budget: number;
}
