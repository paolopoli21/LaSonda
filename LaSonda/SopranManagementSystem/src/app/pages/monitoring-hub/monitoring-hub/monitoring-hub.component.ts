import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
//import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, IPublicClientApplication, InteractionStatus } from '@azure/msal-browser';
//import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMonitoring } from 'src/app/models/IMonitoring';
import { MonitoringHubService } from 'src/app/services/monitoring-hub.service';

@Component({
  selector: 'app-monitoring-hub',
  templateUrl: './monitoring-hub.component.html',
  styleUrls: ['./monitoring-hub.component.css']
})
export class MonitoringHubComponent implements OnInit, AfterViewInit,  OnDestroy  {

  time: Date = new Date();

  displayedColumns: string[] = ['instance', 'processname', 'lastRun', 'runduration','executionstatus','nextRun'];

  public monitoringsSubcription?: Subscription;

  public monitorings: IMonitoring[] = [];
  public dataSource: MatTableDataSource<IMonitoring> = new MatTableDataSource<IMonitoring>([]);
  public monitoringLength: number = 0;
  public monitoringSelected?: IMonitoring;

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";

  //filter
  filterValue: string = "";
  titlePage = "Monitoring";

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  constructor(private monitoringHubService: MonitoringHubService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService) {
    this.monitoringHubService.startConnection()
    this.monitoringHubService.ReceveMonitoring();
    this.dataSource = new MatTableDataSource<IMonitoring>(this.monitorings);
   }
  ngOnDestroy(): void {
    this.monitoringHubService.hubConnection?.stop();
    this.monitoringsSubcription?.unsubscribe();
  }
  
  ngOnInit(): void {
    const instance: IPublicClientApplication = this.msalService.instance;
    const activeAccount: AccountInfo | null = instance.getActiveAccount();
    const accounts: AccountInfo[] = instance.getAllAccounts();
    console.log("info instance",instance);
    console.log("info activeAccount",activeAccount);
    console.log("info accounts",accounts);

    this.refresherMonitoring();
  }
  
  ngAfterViewInit(): void {
    //this.monitoringLength = this.monitorings.length;
  }
  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = this.filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    this.filterGenericList();
  }

  filterGenericList(){
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateMonitorings(){
    this.refresherMonitoring();
    //this.monitoringHubService.loadRefresherMonitoring();
  }

  refresherMonitoring(){
    this.monitoringsSubcription?.unsubscribe();
     this.monitoringsSubcription = this.monitoringHubService.monitoringsRefresher$
      .subscribe(() =>{
        this.getAllMonitorings();
      });
      //this.getAllMonitorings();
  }

  private getAllMonitorings(){
    this.isLoading = true;
    this.monitoringHubService.monitoringsRefresher$
      .subscribe((resp: IMonitoring[])=>{
        //sthis.isLoading = true;
        this.monitorings = resp;
        this.dataSource = new MatTableDataSource(this.monitorings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;

        if(this.filterValue !=""){
          this.filterGenericList();
        }
        this.time = new Date();
        //console.log(resp);
    },
    error =>{
      console.log("Errore montoraggio",error.message);
      //this.monitoringHubService.alertUpdate("Errore caricamento lista monitoraggio --> " + error.message, 20000);
    }
    );
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

  

}
