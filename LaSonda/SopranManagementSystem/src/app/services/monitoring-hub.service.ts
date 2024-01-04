import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMonitoring } from '../models/IMonitoring';
import { ShareService } from './share.service';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class MonitoringHubService {

  public hubConnection?: signalR.HubConnection;
  private _monitoringsRefresher$ = new BehaviorSubject<any>('');

  private url = 'http://localhost:5288/api/Trace/traces';

  constructor(private shareService: ShareService, private httpClient: HttpClient) { }

  public startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/getmonitoringhub",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
    .start()
    .then(() =>{
        console.log("Connection started")
        this.InvokeMonitoring();
    })
    .catch( err =>{
       console.log("Connection finished" + err) 
    });
  }

  public InvokeMonitoring()
  {
    this.hubConnection?.invoke("SendMonitorings").catch((error) =>{
      console.log(error);
    })
  }
  
  public ReceveMonitoring(){
    this.hubConnection?.on("getmonitoringhub", (data: any) =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._monitoringsRefresher$)) {
        this._monitoringsRefresher$.next(data);
        console.log(data);
      }
    });
  }

  get monitoringsRefresher$(){
    console.log(this._monitoringsRefresher$);
    return this._monitoringsRefresher$
  }

  public loadRefresherMonitoring(){
    return this.httpClient.get<IMonitoring[]>(base_url + "/api/monitoring").subscribe(data =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._monitoringsRefresher$)){
        this._monitoringsRefresher$.next(data);
      }
    })
  }
}
