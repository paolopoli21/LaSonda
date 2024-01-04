import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVulnerability } from '../models/IVulnerability';
import { ShareService } from './share.service';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class VulneratilityService {
  private _vulnerabilitiesRefresher$ = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private shareService: ShareService) { }

  loadVulnerabilities(){
    console.log("loadBackupSql");
    return this.httpClient.get<IVulnerability[]>(base_url + "/api/vulnerabilities").subscribe(data =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._vulnerabilitiesRefresher$)){
        this._vulnerabilitiesRefresher$.next(data);
      }
    });
  }

  get VulnerabilitiesRefresher$(){
    //console.log(this._listBackupSqlRefresher$);
    return this._vulnerabilitiesRefresher$
  }
}
