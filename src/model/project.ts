import { IPhasesInfo } from "./phases";
export interface IProjectInfo {
  id: number;
  name: string;
  projectColor: { r: string; g: string; b: string; a: string };
  clientId: number;
  members: { name: string; hourlyrate: number };
  phases: IPhasesInfo[];
  budget: number;
}
