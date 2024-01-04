//import { ThrowStmt } from '@angular/compiler';
import {AfterViewInit, Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IMonitoring } from 'src/app/models/IMonitoring';
import { MonitoringService } from 'src/app/services/monitoring.service';
import { ShareService } from 'src/app/services/share.service';
import { DetailMonitoringComponent } from './detail-monitoring/detail-monitoring.component';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})

export class MonitoringComponent implements OnInit, AfterViewInit,  OnDestroy  {
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

  constructor(private monitoringServie: MonitoringService,private shareService:ShareService,public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<IMonitoring>(this.monitorings);
  }

  ngOnInit(): void {
    this.refresherMonitoring();
  }

  ngAfterViewInit() {
    this.monitoringLength = this.monitorings.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateMonitorings(){
    this.refresherMonitoring();
  }

  refresherMonitoring(){
    this.monitoringsSubcription?.unsubscribe();
     this.monitoringsSubcription = this.monitoringServie.monitoringsRefresher$
      .subscribe(() =>{
        this.getAllMonitorings();
      });
      this.getAllMonitorings();
  }

  private getAllMonitorings(){
    this.isLoading = true;
    this.monitoringServie.getAllMonitorings()
      .subscribe((resp: IMonitoring[])=>{
        this.monitorings = resp;
        this.dataSource = new MatTableDataSource(this.monitorings);
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
    this.monitoringsSubcription?.unsubscribe();
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



