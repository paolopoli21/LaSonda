import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
//import * as signalR from '@microsoft/signalr';
//import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMonitoring } from '../models/IMonitoring';

const base_url:string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class MonitoringRealTimeService {
  public hubConnection?: signalR.HubConnection;
  public monitorings: IMonitoring[] = [];
  public monitoringsUpdate = new Subject();
  private _monitoringsRefresher$ = new Subject<IMonitoring[]>();

  constructor(private httpClient: HttpClient) { }

  public startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/monitoringHub",{
        skipNegotiation : true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

      this.hubConnection
      .start()
      .then(() => {
        console.log("connection started");
      })
      .catch(err =>{
        console.log("connection finished");
      });
  }

  public getMonitorings(){
    return [...this.monitorings];
  }

  public listeningMonitoring(){
    console.log("listeningMonitoring");
    this.hubConnection?.on("getmonitoringhub", (data) =>{
      this.monitorings = data;
      this.monitoringsUpdate.next(this.monitorings);
    });
  }

  httpStartRequest(){
    return this.httpClient.get<IMonitoring[]>(base_url + "/api/monitoringsHub").subscribe(data =>{
      this.monitorings = data;
      this.monitoringsUpdate.next(this.monitorings);
    });
  }

  getAllMonitorings(){
    return this.httpClient.get<IMonitoring[]>(base_url + "/api/monitoringsHub");
  }

  loadRefresherMonitoring(){
    return this.httpClient.get<IMonitoring[]>(base_url)
      .pipe(
        tap(() =>{
          this._monitoringsRefresher$.next();
        })
      );
 }

  get monitoringsRefresher$(){
    console.log(this._monitoringsRefresher$);
    return this._monitoringsRefresher$
  }
}
