import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { ShareService } from 'src/app/services/share.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['Id', 'UserName', 'Password', 'Action'];
  public monitoringsSubcription?: Subscription;

  public users: IUser[] = [];
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  public userLength: number = 0;
  
  private userSubcrition?: Subscription

  @ViewChild(MatSort, {static:true}) sort: any;
  @ViewChild(MatPaginator, {static:true}) paginator: any;

  public registerForm: UntypedFormGroup;
  public isRegister: Boolean = true;
  public loading: boolean= false;
  public isRowSelected = false;
  public selectedRowPosition: number = -1;
  private isAuth: Boolean = false;
  authSubcription?: Subscription;

  constructor(private fb: UntypedFormBuilder, private userService: UserService, private shareService: ShareService) {
    this.registerForm = this.fb.group({
      id: [0],
      userName: ['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required, Validators.minLength(4)]],
      password2:['',[Validators.required, Validators.minLength(4)]],
      idRole:['1',[Validators.required]]
     });
   }
   ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.userLength = this.users.length;
    this.userService.httpStartRequest();
    this.listeningUsers();
  }

  public listeningUsers(){
    this.userSubcrition = this.userService.usersUpdate.subscribe(() =>{
      this.users = this.userService.getUsers();
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log("user: " + this.users);
    });
  }

  ngOnDestroy(): void {
    this.authSubcription?.unsubscribe();
    this.userSubcrition?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(){
    this.loading=true;
    if(!this.isRowSelected){
      this.insertUser();
    }
    else{
      this.updateUser();
    }
  }

  insertUser(){
    this.userService.loginUp(this.registerForm.value).subscribe((resp: IUser) =>{
      console.log("Resgister", resp)
      if(resp){
        console.log({resp});
        this.loading = false;
        //this.registerForm.reset();
        this.resetForm();
        this.loadUser();
        //this.alertUpdate("Inserimento effettuato con successo!");
        this.shareService.alertUpdate("Inserimento effettuato con successo!", 2000);
      }
      else{
        this.loading = false;
        //this.alertUpdate("problemi di inserimento utente");
        this.shareService.alertUpdate("problemi di inserimento utente", 2000);
      }
    },
    error =>{
      this.loading = false;
      this.shareService.alertUpdate("problemi di inserimento utente --> " + error.message, 2000);
    }
    );
  }

  updateUser(){
   this.loading=true
   console.log("UpdateUser",this.registerForm.value)
    this.userService.updateUser(this.registerForm.value).subscribe((resp) =>{
      console.log("Update", resp)
      if(resp){
        console.log({resp});
        this.loading = false;
        this.resetForm();
        this.loadUser();
        this.shareService.alertUpdate("Aggiornamento effettuato con successo!", 2000);
      }
      else{
        this.loading = false;
        this.shareService.alertUpdate("problemi di aggiornamento utente", 2000);
      }
    },
    error =>{
      this.loading = false;
      this.shareService.alertUpdate("problemi di aggiornamento utente --> " + error.message, 2000);
    }
    );
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(resp =>{
      console.log(resp);
      this.resetForm();
      this.loadUser();
      this.isRowSelected = false;
      this.shareService.alertUpdate("Eliminazione è stata effettuata con successo!", 2000);
    });
  }

  isValidRegisterOk(){
    return this.registerForm.valid && this.isPaswordsEquals();
  }

  isValidPassword2(){
    return this.registerForm.get("password2")?.valid; 
  }

  isPaswordsEquals(){
    let passwordEquals: boolean = this.registerForm.get("password2")?.value == this.registerForm.get("password")?.value
    return passwordEquals;
  }

  cleanInputRegister(){
    this.registerForm = this.fb.group({
      userName: ['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required, Validators.minLength(4)]],
      password2:['',[Validators.required, Validators.minLength(4)]],
      idRole:['1',[Validators.required]]
     });
  }

  selectRow(user: IUser){
    this.selectedRowPosition = user.id;
    this.isRowSelected = true;
    this.registerForm = this.fb.group({
      id: [user.id],
      userName: [user.userName,[Validators.required,Validators.minLength(2)]],
      password:[user.password,[Validators.required, Validators.minLength(4)]],
      password2:[user.password,[Validators.required, Validators.minLength(4)]],
      idRole:[user.idRole,[Validators.required]]
     });
  }

  enableRowSelected(){
    this.selectedRowPosition -1;
    this.isRowSelected = false;
    this.isRowSelected = false;
    this.resetForm();
  }

  resetForm(){
    this.registerForm = this.fb.group({
      id: [0],
      userName: ['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required, Validators.minLength(4)]],
      password2:['',[Validators.required, Validators.minLength(4)]],
      idRole:['1',[Validators.required]]
     });
  }

  manageClassActive(row: IUser): string {
    if(row.id ==this.selectedRowPosition){
      return "active";
    }
    return '';
  }
}
