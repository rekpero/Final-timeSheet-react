import { Observable, defer, from } from "rxjs";

import { IProjectTimeSheet } from "../model/timesheet";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";

class ProjectService {
  public getTimeSheetData = (): Observable<IProjectTimeSheet[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectTimeSheet[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/timesheet`).then(r => r.json())
        );
      }
    );
  };

  public getClientData = (): Observable<IClientInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IClientInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/clients`).then(r => r.json())
        );
      }
    );
  };

  public getProjectInfo = (): Observable<IProjectInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/project`).then(r => r.json())
        );
      }
    );
  };

  public getProjectInfoById = (id: number): Observable<IProjectInfo> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectInfo>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/project/${id}`).then(r => r.json())
        );
      }
    );
  };
  public inviteClients = (data: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:4000/invite`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(data)
        })
      );
    });
  };

  public getPhasesInfo = (): Observable<IPhasesInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IPhasesInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/phases`).then(r => r.json())
        );
      }
    );
  };

  public postTimesheetData = (timesheet: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/timesheet`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(timesheet)
        })
      );
    });
  };

  public postClient = (data: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/clients`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(data)
        })
      );
    });
  };

  public postPhase = (data: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/phases`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(data)
        })
      );
    });
  };

  public postProject = (data: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/project`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(data)
        })
      );
    });
  };

  public updateTimesheetData = (update: any, id: number): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/timesheet/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(update)
        })
      );
    });
  };

  public updateClient = (update: any, id: number): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/clients/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(update)
        })
      );
    });
  };

  public updateProject = (update: any, id: number): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/project/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(update)
        })
      );
    });
  };

  public deleteTimesheetData = (id: number): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/timesheet/${id}`, {
          method: "DELETE"
        })
      );
    });
  };

  public deletePhases = (id: string): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/phases/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "DELETE"
        })
      );
    });
  };

  public deleteProject = (id: string): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/project/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "DELETE"
        })
      );
    });
  };

  public deleteClient = (id: string): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/clients/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "DELETE"
        })
      );
    });
  };
}
export default new ProjectService(); // exporting as an object
