export interface IProjectInfo {
  id: number;
  name: string;
  projectColor: { r: string; g: string; b: string; a: string };
  clientId: number;
  members: { name: string; hourlyRate: number };
  phases: {
    name: string;
    id: number;
    color: { r: string; g: string; b: string; a: string };
  };
  budget: { hours: number; recurrence: string; dayofWeek: string };
}
