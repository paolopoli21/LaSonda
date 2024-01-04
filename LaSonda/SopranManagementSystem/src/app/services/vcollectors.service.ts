import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICollector, ICollectorsAddJson } from '../models/ICollector';
import { ShareService } from './share.service';

const base_url: string = environment.urlService;

export class CollectorsAddJson implements ICollectorsAddJson{
  os!: string;
  id!: number;
  lastKeepAlive!: string;
  status!: string;
  group!: string;
  iD_Wazuh!: string;
  name!: string;
  ip!: string;
  scanDate!: string;
  jsoN_Data!: string;
  constructor(){
    
  }
}


@Injectable({
  providedIn: 'root'
})
export class VcollectorsService {
  private _collectorsRefresher$ = new BehaviorSubject<any>('');
  constructor(private httpClient: HttpClient, private shareService: ShareService) { }

  loadCollectors(){
    console.log("loadCollectors");
    return this.httpClient.get<ICollector[]>(base_url + "/api/collectors").subscribe(data =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._collectorsRefresher$)){
        this._collectorsRefresher$.next(data);
      }
    });
  }

  loadCollectorsAddJson(){
    let collectorsAddJsonList : CollectorsAddJson[] = [];
    console.log("loadCollectors");
    return this.httpClient.get<ICollector[]>(base_url + "/api/collectors")
    .pipe(
      tap(collectors =>{
        for(let collector of collectors){
          let collectorsAddJson = new CollectorsAddJson();
          collectorsAddJson.iD_Wazuh = collector.iD_Wazuh;
          collectorsAddJson.ip = collector.ip;
          collectorsAddJson.name = collector.name;
          collectorsAddJson.scanDate = collector.scanDate;
          let objJson = JSON.parse(collector.jsoN_Data);
          collectorsAddJson.os = objJson[0].os.name;
          collectorsAddJson.lastKeepAlive = objJson[0].lastKeepAlive;
          collectorsAddJson.id = objJson[0].id;
          collectorsAddJson.status = objJson[0].status;
          collectorsAddJson.group = (objJson[0].group != undefined)? objJson[0].group[0]: "";
          collectorsAddJsonList.push(collectorsAddJson);
        }
      }),
      mapTo(collectorsAddJsonList)
    )
    .subscribe(data =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._collectorsRefresher$)){
        this._collectorsRefresher$.next(data);
      }
    });
  }

  get CollectorsRefresher$(){
    //console.log(this._listBackupSqlRefresher$);
    return this._collectorsRefresher$;
  }
}
