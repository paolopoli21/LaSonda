import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ICollector } from 'src/app/models/ICollector';
import { ShareService } from 'src/app/services/share.service';
import { VcollectorsService } from 'src/app/services/vcollectors.service';
import { VcollectorsDetailJsonComponent } from '../vcollectors-detail-json/vcollectors-detail-json.component';

@Component({
  selector: 'app-vcollectors',
  templateUrl: './vcollectors.component.html',
  styleUrls: ['./vcollectors.component.css']
})
export class VcollectorsComponent implements OnInit,OnDestroy {
  listLength: number = 100;

  //displayedColumns: string[] = ['iD_Wazuh', 'name' ,'ip','scanDate'];
  displayedColumns: string[] = ['iD_Wazuh', 'name' ,'ip','scanDate','os','lastKeepAlive','id','status','group'];

  public collectorsSubcription?: Subscription;

  public list: ICollector[] = [];
  public dataSource: MatTableDataSource<ICollector> = new MatTableDataSource<ICollector>([]);
  public collectorSelected?: ICollector;

  public isLoading: Boolean = true;

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  constructor(
    private shareService: ShareService,
    private vcollectorsService: VcollectorsService,
    public dialog: MatDialog){
  }
  ngOnDestroy(): void {
    this.collectorsSubcription?.unsubscribe();
  }
  ngOnInit(): void {
    this.updateList();
  }

  private getAllList(){
    this.isLoading = true;
    this.collectorsSubcription = this.vcollectorsService.CollectorsRefresher$
      .subscribe((resp: ICollector[])=>{
        this.list = resp;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
        console.log("collectors",this.list);
    },
    error =>{
      console.log("Errore Collectors ",error.message);
      this.shareService.alertUpdate("Errore caricamento lista collectores --> " + error.message, 20000);
    }
    );
  }

  updateList(){
    //this.backupServic.backupsRefresher$;
    //this.vcollectorsService.loadCollectors();
    this.vcollectorsService.loadCollectorsAddJson();
    this.getAllList();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBackgroundColorRow(row: ICollector){
    // if(row.jsoN_Data != null){
    //   return "classBackcolorRed";
    // }
    // if(row.jsoN_Data == null){
    //   return "classBackcolorGreen";
    // }
    //return "";
    return "classBackcolorGreen";
  }

  // openDialog(row: ICollector) {

  //   if(row.jsoN_Data != null){
  //         this.dialog.open(VcollectorsDetailJsonComponent,{
  //         data: {
  //           row: row.jsoN_Data,
  //           tittle: row.name
  //         }
  //       });

  //   }
  // }
}
  