import { Observable, defer, from } from "rxjs";

import { IProjectTimeSheet } from "../model/timesheet";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";

class ProjectService {
  public timeSheetData = (): Observable<IProjectTimeSheet[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectTimeSheet[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3000/timesheet`).then(r => r.json())
        );
      }
    );
  };

  public clientData = (): Observable<IClientInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IClientInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3000/clients`).then(r => r.json())
        );
      }
    );
  };

  public projectInfo = (): Observable<IProjectInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3000/project`).then(r => r.json())
        );
      }
    );
  };

  public phasesInfo = (): Observable<IPhasesInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IPhasesInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3000/phases`).then(r => r.json())
        );
      }
    );
  };

  public postClient = (data: any): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3000/clients`, {
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
        fetch(`http://localhost:3000/project`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(data)
        })
      );
    });
  };

  public deleteClient = (id: string): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3000/clients/${id}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "DELETE"
        })
      );
    });
  };
}
export default new ProjectService(); // exporting as an object
