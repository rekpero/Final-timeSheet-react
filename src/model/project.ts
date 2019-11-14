export interface IProjectInfo {
  id: number;
  name: string;
  color: string;
  clientId: number;
  memebers: { name: string; hourlyrate: string };
  phases: Array<number>;
  budget: { hours: number; recurrence: string; dayofWeel: string };
}
