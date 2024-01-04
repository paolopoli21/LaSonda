import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IDataProcess } from 'src/app/models/IDataProcess';
import { DataProcessService } from 'src/app/services/data-process.service';
import { MonitoringService } from 'src/app/services/monitoring.service';
import { ShareService } from 'src/app/services/share.service';
import { DetailDataprocessComponent } from './detail-dataprocess/detail-dataprocess.component';
import { DetailprocessNojsonComponent } from './detailprocess-nojson/detailprocess-nojson.component';

@Component({
  selector: 'app-dataprocess',
  templateUrl: './dataprocess.component.html',
  styleUrls: ['./dataprocess.component.css']
})
export class DataprocessComponent implements OnInit, AfterViewInit,  OnDestroy {

  public title: string = "Soprans";

  //displayedColumns: string[] = ['idCheck', 'execDate', 'isJSON', 'data'];
  displayedColumns: string[] = ['idCheck', 'execDate', 'isJSON'];

  public listDataProcessSubcription?: Subscription;

  public listDataProcess: IDataProcess[] = [];
  public dataSource: MatTableDataSource<IDataProcess> = new MatTableDataSource<IDataProcess>([]);
  public monitoringLength: number = 0;
  public DataProcessSelected?: IDataProcess;

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";
  

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  constructor(private dataProcessService: DataProcessService,private shareService:ShareService,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<IDataProcess>(this.listDataProcess);
  }

  ngOnInit(): void {
    this.refresherDataProcess();
  }

  ngAfterViewInit() {
    this.monitoringLength = this.listDataProcess.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateDataProcess(){
    this.refresherDataProcess();
  }

  refresherDataProcess(){
    this.listDataProcessSubcription?.unsubscribe();
     this.listDataProcessSubcription = this.dataProcessService.listDataProcessRefresher$
      .subscribe(() =>{
        this.getData();
      });
      this.getData();
  }

  private getData(){
    this.isLoading = true;
    this.dataProcessService.getData()
      .subscribe((resp: IDataProcess[])=>{
        this.listDataProcess = resp;
        this.dataSource = new MatTableDataSource(this.listDataProcess);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
      //console.log(resp);
    },
    error =>{
      console.log("Errore montoraggio",error.message);
      this.shareService.alertUpdate("Errore caricamento lista monitoraggio --> " + error.message, 20000);
    }
    );
  }

  ngOnDestroy(): void {
    this.listDataProcessSubcription?.unsubscribe();
  }

  getTypeOfClass(row: any): string{
    if(row.executionstatus == "Fallito"){
      return this.classNameError;
    }
    if(row.checkProcess){
      return this.classNameWarning;
    }
    return "";
  }

  selectRow(rowData: IDataProcess){
    this.DataProcessSelected = rowData
  }

  manageClassActive(row: IDataProcess){
    if(row ==this.DataProcessSelected){
      return "active";
    }
    return '';
  }

  openDialog(row: IDataProcess) {
    this.selectRow(row);
    if(!row.isJSON){
      this.dialog.open(DetailprocessNojsonComponent,{
        data: {
          row
        }
      });
    }
    else{
      this.dialog.open(DetailDataprocessComponent,{
        data: {
          row
        }
      });
    }
  }

}
