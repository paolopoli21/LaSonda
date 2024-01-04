import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBackupSql } from '../models/IBackupSql'
import { ShareService } from './share.service';

const base_url: string = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private _listBackupSqlRefresher$ = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private shareService: ShareService) {

  }

  loadBackupListSql(){
    console.log("loadBackupSql");
    return this.httpClient.get<[IBackupSql]>(base_url + "/api/backupSql").subscribe(data =>{
      if(!this.shareService.ExistsListBehaviorSubject(data, this._listBackupSqlRefresher$)){
        this._listBackupSqlRefresher$.next(data);
      }
    });
  }

  get backupsRefresher$(){
    console.log(this._listBackupSqlRefresher$);
    return this._listBackupSqlRefresher$
  }

}
