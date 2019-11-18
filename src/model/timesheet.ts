export interface IProjectTimeSheet {
  id: number;
  project: {
    id: number;
    project: {
      id: number;
      name: string;
      projectColor: { r: string; g: string; b: string; a: string };
      clientId: number;
      members: { name: string; hourlyrate: number };
      phases: {
        name: string;
        id: number;
        color: { r: string; g: string; b: string; a: string };
        budget: { hours: number; recurrence: string; dayofWeek: string };
        timeWorked: number;
        phases: string;
        date: string;
        note: string;
      };
    };
  };
}
