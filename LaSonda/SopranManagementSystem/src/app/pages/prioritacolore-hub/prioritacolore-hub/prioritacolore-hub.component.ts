import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IDataProcess } from 'src/app/models/IDataProcess';
import { IPrioritaColore } from 'src/app/models/IPrioritaColore';
import { IVDataProcess } from 'src/app/models/IVDataProcess';
import { DataProcessService } from 'src/app/services/data-process.service';
import { PrioritacoloreHubService } from 'src/app/services/prioritacolore-hub.service';
import { DetailDataprocessComponent } from '../../dataprocess/dataprocess/detail-dataprocess/detail-dataprocess.component';
import { DetailProcessJsonComponent } from './detail-process-json/detail-process-json.component';
import { DetailProcessNojsonComponent } from './detail-process-nojson/detail-process-nojson.component';

@Component({
  selector: 'app-prioritacolore-hub',
  templateUrl: './prioritacolore-hub.component.html',
  styleUrls: ['./prioritacolore-hub.component.css']
})
export class PrioritacoloreHubComponent implements OnInit,AfterViewInit, OnDestroy {

  prioritaColoreSubcription?: Subscription;
  public prioritaColori: IPrioritaColore[] = [];

  displayedColumns: string[] = ['idCheck', 'nome', 'descrizione', 'idStato', 'lastUpdate'];

  public listDataProcessSubcription?: Subscription;

  public dataProcessResultSubcription?: Subscription;

  public listVDataProcess: IVDataProcess[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<IVDataProcess>([]);
  public monitoringLength: number = 0;
  public DataProcessSelected?: IVDataProcess;

  public listDataProcess: IDataProcess[] = [];

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  constructor(public prioritacoloreHubService: PrioritacoloreHubService, public dialog: MatDialog, private dataProcessService: DataProcessService) { }

  ngOnDestroy(): void {
    this.prioritaColoreSubcription?.unsubscribe();
    this.prioritaColoreSubcription?.unsubscribe();
    this.listDataProcessSubcription?.unsubscribe();
    this.dataProcessResultSubcription?.unsubscribe();
  }
  ngOnInit(): void {
    this.prioritacoloreHubService.startConnectionAnagrafica();
    this.prioritacoloreHubService.listeningAnagrafica();
    this.prioritacoloreHubService.startConnection();
    this.prioritacoloreHubService.listeningPrioritaColori();
    this.prioritacoloreHubService.getVdataProcess();
    this.getData();
  }

  ngAfterViewInit(): void {
    //this.userLength = this.users.length;
    //this.prioritacoloreHubService.listeningPrioritaColori();
    //this.prioritacoloreHubService.httpStartRequest();
    //this.listeningPrioritaColori();
    // this.prioritacoloreHubService.startConnection();
    // this.prioritacoloreHubService.listeningPrioritaColori();
    
    //this.getData();
    //this.getData();
  }

  refresherDataProcess(){
      this.dataProcessService.getVDataProcess().subscribe(resp =>{
      this.listVDataProcess = resp;
      this.dataSource = new MatTableDataSource(this.listVDataProcess);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator?.firstPage();
      this.isLoading = false;
      console.log("refresherDataProcess", this.listVDataProcess);
    })
  }

  private getData(){
    this.isLoading = true;
    //this.prioritacoloreHubService.listVDataProcessSubject
    this.prioritaColoreSubcription = this.prioritacoloreHubService.listVDataProcessBehaviorSubject
      .subscribe((resp: any)=>{
        this.listVDataProcess = resp;
        this.dataSource = new MatTableDataSource(this.listVDataProcess);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
        //this.prioritacoloreHubService.listVDataProcessSubject.complete();
      console.log(resp);
    },
    error =>{
      console.log("Errore montoraggio",error.message);
      //this.shareService.alertUpdate("Errore caricamento lista monitoraggio --> " + error.message, 20000);
    }

    );
  }

  public listeningPrioritaColori(){
    this.prioritaColoreSubcription = this.prioritacoloreHubService.prioritaColoriUpdate.subscribe(() =>{
      this.prioritaColori = this.prioritacoloreHubService.getPrioritaColori();
      // this.dataSource = new MatTableDataSource(this.users);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      console.log("Cambia colori: " + this.prioritaColori);
    });
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

  openDialog(rowDataProcessResult: IVDataProcess) {
    this.selectRow(rowDataProcessResult);
    //rowDataProcessResult.idCheck
    this.dataProcessResultSubcription = this.dataProcessService.LoadRefresherDataProcessResultByIdCheck(rowDataProcessResult.idCheck).subscribe((row: IDataProcess) =>{
      if(row == null){
        //alert("Non ci sono dettagli");
        return;
      }
      if(!row.isJSON){
        this.dialog.open(DetailProcessNojsonComponent,{
          data: {
            row,
            tittle: rowDataProcessResult.nome
          }
        });
      }
      else{
        this.dialog.open(DetailProcessJsonComponent,{
          data: {
            row,
            tittle: rowDataProcessResult.nome
          }
        });
      }
    });
  }

  selectRow(rowData: IVDataProcess){
    this.DataProcessSelected = rowData
  }

  updateDataProcess(){
    this.refresherDataProcess();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  manageClassActive(row: IVDataProcess){
    if(row ==this.DataProcessSelected){
      return "active";
    }
    return '';
  }

}
