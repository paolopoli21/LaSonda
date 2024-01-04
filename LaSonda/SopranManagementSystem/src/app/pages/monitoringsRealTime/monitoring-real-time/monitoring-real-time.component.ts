import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IMonitoring } from 'src/app/models/IMonitoring';
import { MonitoringRealTimeService } from 'src/app/services/monitoring-real-time.service';
import { ShareService } from 'src/app/services/share.service';
import { DetailMonitoringComponent } from '../../monitorings/monitoring/detail-monitoring/detail-monitoring.component';

@Component({
  selector: 'app-monitoring-real-time',
  templateUrl: './monitoring-real-time.component.html',
  styleUrls: ['./monitoring-real-time.component.css']
})
export class MonitoringRealTimeComponent implements OnInit, AfterViewInit, OnDestroy {

  public title: string = "Soprans";

  displayedColumns: string[] = ['instance', 'processname', 'lastRun', 'runduration','executionstatus','nextRun'];

  public monitoringsSubcription?: Subscription;

  public monitorings: IMonitoring[] = [];
  public dataSource: MatTableDataSource<IMonitoring> = new MatTableDataSource<IMonitoring>([]);
  public monitoringLength: number = 0;
  public monitoringSelected?: IMonitoring;

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";
  

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;



  //public montorings: any[] = [];

  private monitoringSubcription?: Subscription;
  

  constructor(public monitoringRealTimeService: MonitoringRealTimeService,private shareService:ShareService,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<IMonitoring>(this.monitorings);
  }
  ngOnDestroy(): void {
    
    this.monitoringSubcription?.unsubscribe();
  }
  
  ngOnInit(): void {
    // this.monitoringRealTimeService.startConnection();
    // this.monitoringRealTimeService.listeningMonitoring();
    //this.listeningMonitorings();
    this.refresherMonitoring();
  }
  
  ngAfterViewInit(): void {
    // setTimeout(() =>{
    //   this.monitoringRealTimeService.listeningMonitoring();
    // },5000);
    // this.monitoringRealTimeService.httpStartRequest();
    // this.listeningMonitorings();
    this.monitoringLength = this.monitorings.length;
  }

  public listeningMonitorings(){
    this.monitoringSubcription = this.monitoringRealTimeService.monitoringsUpdate.subscribe(()=>{
      this.monitorings = this.monitoringRealTimeService.getMonitorings();
      console.log("monitorings",this.monitorings);
    });
  }

  refresherMonitoring(){
    this.monitoringsSubcription?.unsubscribe();
     this.monitoringsSubcription = this.monitoringRealTimeService.monitoringsRefresher$
      .subscribe(() =>{
        this.getAllMonitorings();
      });
      this.getAllMonitorings();
  }

  private getAllMonitorings(){
    this.isLoading = true;
    this.monitoringRealTimeService.getAllMonitorings()
      .subscribe((resp: IMonitoring[])=>{
        this.monitorings = resp;
        this.dataSource = new MatTableDataSource(this.monitorings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
      console.log(resp);
    },
    error =>{
      console.log("Errore montoraggio",error.message);
      this.shareService.alertUpdate("Errore caricamento lista monitoraggio --> " + error.message, 20000);
    }
    );
  }

  updateMonitorings(){
    this.refresherMonitoring();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  selectRow(rowMontoring: IMonitoring){
    this.monitoringSelected = rowMontoring
    // this.isRowSelected = true;
  }

  manageClassActive(row: IMonitoring){
    if(row ==this.monitoringSelected){
      return "active";
    }
    return '';
  }

  openDialog(montoring: IMonitoring) {
    this.selectRow(montoring);
    this.dialog.open(DetailMonitoringComponent,{
      data: {
         montoring
      }
    });
  }
}
