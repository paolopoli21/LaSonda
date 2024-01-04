import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { IMonitoring } from 'src/app/models/IMonitoring';


@Component({
  selector: 'app-detail-monitoring',
  templateUrl: './detail-monitoring.component.html',
  styleUrls: ['./detail-monitoring.component.css']
})
export class DetailMonitoringComponent implements OnInit {

  //public jsonData: string = "";

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    //this.jsonData = this.data?.data;
  }
  ngOnInit(): void {
  }

}
