import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-detail-process-nojson',
  templateUrl: './detail-process-nojson.component.html',
  styleUrls: ['./detail-process-nojson.component.css']
})
export class DetailProcessNojsonComponent implements OnInit {
  public storeProcedureTitle: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.storeProcedureTitle = data.tittle;
  }

  ngOnInit(): void {
  }

}
