import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ISelectQuery } from 'src/app/models/ISelectQuery';
import { SelectdbService } from 'src/app/services/selectdb.service';

@Component({
  selector: 'app-select-db',
  templateUrl: './select-db.component.html',
  styleUrls: ['./select-db.component.css']
})
export class SelectDbComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];

  public listQuery: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public listQueryLength: number = 0;

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  private selectQuery: ISelectQuery;
  public formGroupSelect: UntypedFormGroup;  
  public existsDataListQuery: boolean =  false;
  public listDatabase: any[] = [];
  selected = '4';
  NumeroColonne: number = 0;
  cbSelectNumeroColonneValue: string = "4";
  cbSelectServerValue : string = "1_35";
  cbSelectDatabaseValue:string = "mago_sop";
  isDataBaseDefinito: boolean = false;
  hasNumber: boolean = true;


  constructor(private selectdb: SelectdbService, private fb: UntypedFormBuilder) { 
    this.selectQuery = {
      Query: ""
    }
    this.formGroupSelect = this.fb.group({
      query: ['',[Validators.required]],
    });
    this.dataSource = new MatTableDataSource<any>(this.listQuery);
  }
  
  ngOnInit(): void {
    this.getNumeroColonne();
    this.loadListDataBase();
    this.checkDataBaseDefinito();
    this.checkNumber();
  }
  
  ngAfterViewInit(): void {
    this.listQueryLength = this.listQuery.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectDbSopranMago(selectQuery: ISelectQuery){
    this.selectdb.getSelectQueryDbSopranMago(selectQuery)
      .subscribe(resp =>{
        this.listQuery = resp;
        this.getCreateColumn();
        this.dataSource = new MatTableDataSource(this.listQuery);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  getCreateColumn(){
    let firtsRow = this.listQuery[0];
    let countColumn = 0;
    this.displayedColumns = [];
    for(let field in firtsRow){
      countColumn++;
      if(countColumn <= this.getNumeroColonne()){
        this.displayedColumns.push(field);
      }
    }
  }

  applyQuery(){
    if(this.isDbSopranMago()){
      this.loadSelectQuery();
      this.getSelectDbSopranMago(this.selectQuery);
    }
  }

  loadSelectQuery(){
    this.selectQuery.Query = this.formGroupSelect.get("query")?.value;
  }

  existsDataList(){
    return this.listQuery.length > 0
  }

  getNumeroColonne(): number{
    if(this.getCbSelectValueNumber() === -1){
      return this.NumeroColonne;
    }
    return this.getCbSelectValueNumber();
  }

  getTxtValue(txtValue: String){
    this.NumeroColonne = 0;
    if(!this.isEmptyTxtValue(txtValue)){
      this.NumeroColonne = Number(txtValue);
    }
    this.checkNumber();
  }

  checkNumber(){
    this.hasNumber = true;
    if(this.cbSelectNumeroColonneValue ==="-1"){
      if(this.NumeroColonne === 0){
        this.hasNumber = false;
      }
    }
  }

  isEmptyTxtValue(txtValue: String){
    return txtValue.trim() ==="";
  }

  getCbSelectValueNumber(): number{
    return  Number(this.cbSelectNumeroColonneValue);
  }

  isDisabledInputColumnNumber(){
    if(this.getCbSelectValueNumber() !== -1){
      return true;
    }
    return false;
  }

  isDisabledInputApplica(): boolean{
    if(this.getNumeroColonne() === 0){
      return true;
    }
    if(!this.formGroupSelect.valid){
      return true;
    }
    if(!this.isDbSopranMago()){
      return true;
    }
    return false;
  }

  loadListDataBase(){
    if(this.cbSelectServerValue == "1_35"){
      this.listDatabase = this.selectdb.getDataBaseMago1_35();
    }
    if(this.cbSelectServerValue == "2_12"){
      this.listDatabase = this.selectdb.getDataBaseMago2_12();
    }
  }

  onChangeSelectServerValue(event: any){
    this.loadListDataBase();
  }

  onChangeSelectDataBase(event:any){
    this.checkDataBaseDefinito();
  }

  onChangeSelectNumeroColonne(event:any){
    this.checkNumber();
  }

  checkDataBaseDefinito(){
    this.isDataBaseDefinito = true
    if(this.cbSelectDatabaseValue !== "mago_sop"){
      this.isDataBaseDefinito = false;
    }
  }

  isDbSopranMago(){
    return this.cbSelectDatabaseValue === "mago_sop"
  }



}
