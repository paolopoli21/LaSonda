import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISelectQuery } from '../models/ISelectQuery';

const base_urlDbMago: string = environment.urlService + "/api/sopranmago";

@Injectable({
  providedIn: 'root'
})
export class SelectdbService {

  constructor(private httpClient: HttpClient) {

   }

   getSelectQueryDbSopranMago(selectQuery: ISelectQuery){
     return this.httpClient.post<any>(`${ base_urlDbMago }`, selectQuery);
   }

   getDataBaseMago1_35(){
     return [
       {
          key:'mago_sop',
          value: 'Mago Sop'
       },
       {
          key:'mago_co2',
          value: 'Mago co2'
       }
     ];
   }

   getDataBaseMago2_12(): any[]{
    return [
      {
        key:'mago_cit',
        value: 'Mago Cit'
      }
    ];
   }
}
