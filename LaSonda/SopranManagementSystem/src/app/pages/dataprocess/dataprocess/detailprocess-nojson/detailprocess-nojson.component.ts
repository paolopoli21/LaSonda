import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-detailprocess-nojson',
  templateUrl: './detailprocess-nojson.component.html',
  styleUrls: ['./detailprocess-nojson.component.css']
})
export class DetailprocessNojsonComponent implements OnInit {
  public storeProcedureTitle: String = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);
    if(data.row.data.split('"').length > 0){
      this.storeProcedureTitle = data.row.data.split('"')[1]
    }
  }

  ngOnInit(): void {
  }

}
