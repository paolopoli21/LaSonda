import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDataProcess } from '../models/IDataProcess';
import { IAnagrafica } from '../models/IAnagrafica';
import { IVDataProcess } from '../models/IVDataProcess';

const base_url: string = environment.urlService + "/api/sonda";

@Injectable({
  providedIn: 'root'
})
export class DataProcessService {

  public listDataProcessSubject =  new Subject<IDataProcess[]>();
  private _listDataProcessRefresher$ = new Subject<IDataProcess[]>();
  private listDataProcess: IDataProcess[] = [];

  public listVDataProcessSubject =  new Subject<IVDataProcess[]>();
  private _listVDataProcessRefresher$ = new Subject<IVDataProcess[]>();
  private listVDataProcess: IVDataProcess[] = [];

  public anagraficheSubject =  new Subject<IAnagrafica>();
  private _anagraficaRefresher$ = new Subject<IAnagrafica>();
  private angrafica?: IAnagrafica;


  public DataProcessResultSubject =  new Subject<IDataProcess>();
  private _DataProcessResultRefresher$ = new Subject<IDataProcess[]>();
  //private dataProcessResult?: IDataProcess;


  constructor(private httpClient: HttpClient) {

   }

  get listDataProcessRefresher$(){
    console.log(this._listDataProcessRefresher$);
    return this._listDataProcessRefresher$
  }

  get listVDataProcessRefresher$(){
    console.log(this._listVDataProcessRefresher$);
    return this._listVDataProcessRefresher$
  }

  get DataProcessResultRefresher$(){
    console.log(this._DataProcessResultRefresher$);
    return this._DataProcessResultRefresher$
  }

  getData(){
    return this.httpClient.get<IDataProcess[]>(base_url + "/monitoringresult");
  }

  loadRefresherData(){
    return this.httpClient.get<IDataProcess[]>(base_url + "/monitoringresult")
      .pipe(
        tap(() =>{
          this._listDataProcessRefresher$.next();
        })
      );
   }
  getAnagraficaByIdCheck(idCheck: number){
    return this.httpClient.get<IDataProcess>(base_url + "/anagrafica/" + idCheck);
  }

  loadRefresherAnagrafica(idCheck: number){
    return this.httpClient.get<IDataProcess>(base_url + "/anagrafica/" + idCheck)
      .pipe(
        tap(() =>{
          this._anagraficaRefresher$.next();
        })
      );
   }

   getVDataProcess(){
    return this.httpClient.get<IVDataProcess[]>(base_url + "/monitoringprocess");
  }

  loadRefresherVDataProcess(){
    return this.httpClient.get<IVDataProcess[]>(base_url + "/monitoringprocess")
      .pipe(
        tap(() =>{
          this._listDataProcessRefresher$.next();
        })
      );
  }

  getDataProcessResultByIdCheck(idCheck: number){
    return this.httpClient.get<IDataProcess>(base_url + "/monitoringresult/" + idCheck);
  }

  LoadRefresherDataProcessResultByIdCheck(idCheck: number){
    return this.httpClient.get<IDataProcess>(base_url + "/monitoringresult/" + idCheck)
      .pipe(
        tap(() =>{
          this._DataProcessResultRefresher$.next();
        })
      );
   }

}
