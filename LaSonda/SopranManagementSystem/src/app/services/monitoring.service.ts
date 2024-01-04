import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMonitoring } from '../models/IMonitoring';

const base_url: string = environment.urlService + "/api/monitoring";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  public monitoringsSubject =  new Subject<IMonitoring[]>();
  private _monitoringsRefresher$ = new Subject<IMonitoring[]>();
  private monitorings: IMonitoring[] = [];

  constructor(private httpClient: HttpClient) {
  }

   get monitoringsRefresher$(){
     console.log(this._monitoringsRefresher$);
     return this._monitoringsRefresher$
   }

   getAllMonitorings(){
    return this.httpClient.get<IMonitoring[]>(base_url);
  }

   loadRefresherMonitoring(){
      return this.httpClient.get<IMonitoring[]>(base_url)
        .pipe(
          tap(() =>{
            this._monitoringsRefresher$.next();
          })
        );
   }
}
