import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-vdetail-dataprocess-nojson',
  templateUrl: './vdetail-dataprocess-nojson.component.html',
  styleUrls: ['./vdetail-dataprocess-nojson.component.css']
})
export class VdetailDataprocessNojsonComponent implements OnInit {

  public storeProcedureTitle: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.storeProcedureTitle = data.tittle;
   }

  ngOnInit(): void {
  }

}
