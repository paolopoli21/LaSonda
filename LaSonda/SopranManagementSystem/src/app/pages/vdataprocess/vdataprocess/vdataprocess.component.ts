import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
//import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
//import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IDataProcess } from 'src/app/models/IDataProcess';
import { IVDataProcess } from 'src/app/models/IVDataProcess';
import { DataProcessService } from 'src/app/services/data-process.service';
import { MonitoringService } from 'src/app/services/monitoring.service';
import { ShareService } from 'src/app/services/share.service';
import { VdetailDataprocessNojsonComponent } from './vdetail-dataprocess-nojson/vdetail-dataprocess-nojson.component';
import { VdetailDataprocessComponent } from './vdetail-dataprocess/vdetail-dataprocess.component';
import { MonitoringHubService } from 'src/app/services/monitoring-hub.service';

// import { DetailDataprocessComponent } from './detail-dataprocess/detail-dataprocess.component';
// import { DetailprocessNojsonComponent } from './detailprocess-nojson/detailprocess-nojson.component';

@Component({
  selector: 'app-vdataprocess',
  templateUrl: './vdataprocess.component.html',
  styleUrls: ['./vdataprocess.component.css']
})
export class VdataprocessComponent implements OnInit {
  time: Date = new Date();

  public title: string = "Soprans";
  titlePage = "Data process";

  displayedColumns: string[] = ['idCheck', 'nome' ,'storedProcedure','lastUpdate','owner'];

  public listDataProcessSubcription?: Subscription;

  public dataProcessResultSubcription?: Subscription;

  public listVDataProcess: IVDataProcess[] = [];
  public dataSource: MatTableDataSource<IVDataProcess> = new MatTableDataSource<IVDataProcess>([]);
  public monitoringLength: number = 0;
  public DataProcessSelected?: IVDataProcess;

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";

  currentFilterValue: string = '';

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;


  constructor(private dataProcessService: DataProcessService,private shareService:ShareService,public dialog: MatDialog, private monitoringHubService: MonitoringHubService) {
    this.monitoringHubService.startConnection()
    this.monitoringHubService.ReceveMonitoring();
    this.dataSource = new MatTableDataSource<IVDataProcess>(this.listVDataProcess);
   }

  ngOnInit(): void {
    //this.refresherDataProcess();  
    //this.monitoringHubService.loadRefresherMonitoring();
    this.automaticLoadDataProcess();
  }

  ngAfterViewInit() {
    this.monitoringLength = this.listVDataProcess.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentFilterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

updateDataProcess(){
  this.refresherDataProcess();
  this.dataSource.filter = this.currentFilterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
  }
}

automaticLoadDataProcess(){
  this.monitoringHubService.monitoringsRefresher$.subscribe(resp => {
    this.updateDataProcess();
    this.time = new Date();
  });
}


  refresherDataProcess(){
    this.listDataProcessSubcription?.unsubscribe();
     this.listDataProcessSubcription = this.dataProcessService.listVDataProcessRefresher$
      .subscribe(() =>{
        this.getData();
      });
      this.getData();
  }

  private getData(){
    this.isLoading = true;
    this.dataProcessService.getVDataProcess()
      .subscribe((resp: IVDataProcess[])=>{
        this.listVDataProcess = resp;
        this.dataSource = new MatTableDataSource(this.listVDataProcess);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
        this.dataSource.filter = this.currentFilterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }

      console.log(resp);
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

  selectRow(rowData: IVDataProcess){
    this.DataProcessSelected = rowData
  }

  manageClassActive(row: IVDataProcess){
    if(row ==this.DataProcessSelected){
      return "active";
    }
    return '';
  }

  openDialog(rowDataProcessResult: IVDataProcess) {
    this.selectRow(rowDataProcessResult);
    //rowDataProcessResult.idCheck
    this.dataProcessResultSubcription = this.dataProcessService.LoadRefresherDataProcessResultByIdCheck(rowDataProcessResult.idCheck).subscribe((row: IDataProcess) =>{
      if(row == null){
        //alert("Non ci sono dettagli");
        return;
      }
      if(!row.isJSON){
        this.dialog.open(VdetailDataprocessNojsonComponent,{
          data: {
            row,
            tittle: rowDataProcessResult.nome
          }
        });
      }
      else{
        this.dialog.open(VdetailDataprocessComponent,{
          data: {
            row,
            tittle: rowDataProcessResult.nome
          }
        });
      }
    });


    // if(!row.isJSON){
    //   this.dialog.open(DetailprocessNojsonComponent,{
    //     data: {
    //       row
    //     }
    //   });
    // }
    // else{
    //   this.dialog.open(DetailDataprocessComponent,{
    //     data: {
    //       row
    //     }
    //   });
    // }
  }

}
