import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from "../utilTable";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-vdetail-dataprocess',
  templateUrl: './vdetail-dataprocess.component.html',
  styleUrls: ['./vdetail-dataprocess.component.css']
})
export class VdetailDataprocessComponent implements OnInit {
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
  //public tittles:any;

  //public dataSourceExcel 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.stringJson = data?.row.data;
    this.dataJson = JSON.parse(this.stringJson);
    this.tittle = data.tittle;
    
    //this.tittles =  Object.keys(this.dataJson[0]);
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
    // if(this.getCbSelectValueNumber() === -1){
    // }
    //return this.getCbSelectValueNumber();
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

  configDimensionTable(){
    if(this.NumeroColonne > 19){
      this.classContainerTable = "w200PcontainerTable";
    }
    if(this.NumeroColonne = 19){
      this.classContainerTable = "w190PcontainerTable";
    }
    if(this.NumeroColonne = 18){
      this.classContainerTable = "w180PcontainerTable";
    }
    if(this.NumeroColonne = 17){
      this.classContainerTable = "w170PcontainerTable";
    }
    if(this.NumeroColonne = 16){
      this.classContainerTable = "w160PcontainerTable";
    }
    if(this.NumeroColonne = 15){
      this.classContainerTable = "w150PcontainerTable";
    }
    if(this.NumeroColonne = 14){
      this.classContainerTable = "w140PcontainerTable";
    }
    if(this.NumeroColonne = 13){
      this.classContainerTable = "w130PcontainerTable";
    }
    if(this.NumeroColonne = 12){
      this.classContainerTable = "w120PcontainerTable";
    }
    if(this.NumeroColonne = 11){
      this.classContainerTable = "w110PcontainerTable";
    }
    else{
      this.classContainerTable = "w100PcontainerTable";
    }

  }

  exportTable() {
    TableUtil.exportTableToExcel("DataProcessMaterialTable","");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("DataProcessMaterialTable","");
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<any>[] = this.dataJson.map((x:any) => ({
      name: x.name,
      symbol: x.symbol
    }));
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "ExampleArray");
  }

}
