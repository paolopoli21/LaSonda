import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
//import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
//import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { IBackupSql } from 'src/app/models/IBackupSql';
import { BackupService } from 'src/app/services/backup.service';
import { ShareService } from 'src/app/services/share.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-backup-sql',
  templateUrl: './backup-sql.component.html',
  styleUrls: ['./backup-sql.component.css']
})
export class BackupSqlComponent implements OnInit, AfterViewInit,OnDestroy {
  public title: string = "Sopran";
  titlePage = "Backup Sql";
  backupsLength: number = 100;


  

  displayedColumns: string[] = ['serverName','instance', 'dbName', 'backupType', 'backupStartDate'];

  public backupsSubcription?: Subscription;

  public backups: IBackupSql[] = [];
  public dataSource: MatTableDataSource<IBackupSql> = new MatTableDataSource<IBackupSql>([]);
  public backupSelected?: IBackupSql;

  public isLoading: Boolean = true;

  public classNameError: string = "classError";
  public classNameWarning: string = "classWarning";
  public currentFilterValue: string = '';

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  
  constructor(private backupServic: BackupService, private shareService: ShareService) { }

  ngOnInit(): void {
    this.backupServic.loadBackupListSql();
    this.getAllBackups();
  }

  ngAfterViewInit() {
    //this.backupsLength = this.backups.length;
  }

  ngOnDestroy(): void {
    this.backupsSubcription?.unsubscribe();
  }


  private getAllBackups(){
    this.isLoading = true;
    this.backupsSubcription = this.backupServic.backupsRefresher$
      .subscribe((resp: IBackupSql[])=>{
        this.backups = resp;
        this.dataSource = new MatTableDataSource(this.backups);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator?.firstPage();
        this.isLoading = false;
        
        this.dataSource.filter = this.currentFilterValue.trim().toLowerCase(); 
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
        console.log(this.backups);
    },
    error =>{
      console.log("Errore backup sql",error.message);
      this.shareService.alertUpdate("Errore caricamento lista backup sql --> " + error.message, 20000);
    }
    );
  }
  
  updateBakups(){
    //this.backupServic.backupsRefresher$;
    this.backupServic.loadBackupListSql();
    this.getAllBackups();
    this.dataSource.filter = this.currentFilterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentFilterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClassRedBackupType(row: any): string {
    if(row.backupType==""){
      return "classBackcolorRed";
    }
    return "";
  }
  

}
