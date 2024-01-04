import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtil } from '../../vdataprocess/vdataprocess/utilTable';

export interface ICollectorDetail{
    
}


export interface IOs{
  name: string;
}

@Component({
  selector: 'app-vcollectors-detail-json',
  templateUrl: './vcollectors-detail-json.component.html',
  styleUrls: ['./vcollectors-detail-json.component.css']
})
export class VcollectorsDetailJsonComponent implements OnInit {
  displayedColumns: string[] = [];
  NumeroColonne: number = 20;
  public classContainerTable: string = "w100PcontainerTable";
  
  public listQueryLength: number = 0;
  
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;
  
  public stringJson: string = "";
  public dataJson: any;
  public tittle: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
      this.stringJson = data?.row;
      this.dataJson = JSON.parse(this.stringJson);
      this.tittle = data.tittle;  
  }
  
  ngOnInit(): void {
    this.getNumeroColonne();
    this.getDataJson();
  }

  getCreateColumn(){
    if(this.dataJson[0] == null) return;
    let firtsRow =  Object.keys(this.dataJson[0]);
    let countColumn = 0;
    this.displayedColumns = [];
    for(let index in firtsRow){
      countColumn++;
      if(countColumn <= this.getNumeroColonne()){
        this.displayedColumns.push(firtsRow[index]);
      }
    }
  }

  getNumeroColonne(): number{
    return this.NumeroColonne;
  }

  // getCbSelectValueNumber(): Number{
  //   return  Number(this.cbSelectNumeroColonneValue);
  // }

  getDataJson(){
    //this.listQuery = resp;
    this.getCreateColumn();
    this.dataSource = new MatTableDataSource(this.dataJson);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      //this.dataSource.paginator.firstPage();
    }
  }

  getTxtValue(txtValue: String){
    this.NumeroColonne = 0;
    if(!this.isEmptyTxtValue(txtValue)){
      this.NumeroColonne = Number(txtValue);
      //this.configDimensionTable();
      this.getDataJson();
    }
    //this.checkNumber();
  }

  isEmptyTxtValue(txtValue: String){
    return txtValue.trim() ==="";
  }

  exportTable() {
    TableUtil.exportTableToExcel("VulnerabilitiesMaterialTable","");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("VulnerabilitiesMaterialTable","");
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<any>[] = this.dataJson.map((x:any) => ({
      name: x.name,
      symbol: x.symbol
    }));
    //TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "ExampleArray");
  }


}
