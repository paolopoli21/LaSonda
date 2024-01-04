import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { IPrioritaColore } from '../models/IPrioritaColore';
import { DataProcessService } from './data-process.service';
import { IDataProcess } from '../models/IDataProcess';
import { IVDataProcess } from '../models/IVDataProcess';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class PrioritacoloreHubService {

  public hubConnection?: signalR.HubConnection;
  public hubConnectionAnagrafica?: signalR.HubConnection;
  public prioritaColori: IPrioritaColore[] = [];
  public prioritaColoriUpdate = new Subject();

  public listVDataProcessSubject =  new Subject<IVDataProcess[]>();
  private _listVDataProcessRefresher$ = new Subject<IVDataProcess[]>();

  public listVDataProcessBehaviorSubject = new BehaviorSubject<any>('');
  private listVDataProcessBehaviorSubject$ = new BehaviorSubject<any>('');
  
  private listVDataProcess: IVDataProcess[] = [];

  constructor(private httpClient: HttpClient, private dataProcessService: DataProcessService) {

  }

  public startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/prioritacolorihub",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
    .start()
    .then(() =>{
        console.log("Connection started")
    })
    .catch( err =>{
       console.log("Connection finished" + err) 
    });
  }

  public startConnectionAnagrafica(){
    this.hubConnectionAnagrafica = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/anagraficahub",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnectionAnagrafica
    .start()
    .then(() =>{
        console.log("Connection anagrafica started")
    })
    .catch( err =>{
       console.log("Connection anagrafica finished" + err) 
    });
  }

  public getPrioritaColori(){
    return [...this.prioritaColori];
  }

  public listeningPrioritaColori(){
    this.hubConnection?.on("getprioritacolorihub", (data) =>{
      //this.prioritaColori = data;
      //this.prioritaColoriUpdate.next(this.prioritaColori);
      this.dataProcessService.getVDataProcess().subscribe((resp: any) =>{
        console.log("getprioritacolorihub");
        this.listVDataProcessBehaviorSubject.next(resp);
        //this.listVDataProcessSubject.next(resp);
      });
    });
  }

  public getVdataProcess(){
    this.dataProcessService.getVDataProcess().subscribe((resp: any) =>{
      console.log("getVdataProcess");
      this.listVDataProcessBehaviorSubject.next(resp);
    });
  }

  httpStartRequest(){
    return this.httpClient.get<IPrioritaColore[]>(base_url + '/api/prioritacolori').subscribe(data =>{
      this.prioritaColori = data;
      this.prioritaColoriUpdate.next(this.prioritaColori);
    });
  }

  //anagrafica hub

  public listeningAnagrafica(){
    this.hubConnectionAnagrafica?.on("getanagraficahub", (data) =>{
      console.log("listeningAnagrafica");
      this.dataProcessService.getVDataProcess().subscribe((resp: any) =>{
        console.log("getanagraficahub");
        this.listVDataProcessBehaviorSubject.next(resp);
        //this.listVDataProcessSubject.next(resp);
      });
    });
  }



}
