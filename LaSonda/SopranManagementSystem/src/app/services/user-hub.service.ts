import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';

import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class UserHubService {

  public hubConnection?: signalR.HubConnection;
  public users: IUser[] = [];
  public usersUpdate = new Subject();

  constructor(private httpClient: HttpClient) { }

  public startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(base_url + "/userhub",{
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

  public getUsers(){
    return [...this.users];
  }

  public listeningUsers(){
    console.log("getuserhub");
    this.hubConnection?.on("getuserhub", (data) =>{
      this.users = data;
      this.usersUpdate.next(this.users);
    });
  }
  
  httpStartRequest(){
    return this.httpClient.get<IUser[]>(base_url + '/api/users').subscribe(data =>{
      this.users = data;
      this.usersUpdate.next(this.users);
    });
  }  
}
