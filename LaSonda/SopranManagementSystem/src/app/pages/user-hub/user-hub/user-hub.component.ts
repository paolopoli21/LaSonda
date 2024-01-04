import { Component, OnInit } from '@angular/core';

import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';


import { IUser } from 'src/app/models/IUser';
import { UserHubService } from 'src/app/services/user-hub.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-hub',
  templateUrl: './user-hub.component.html',
  styleUrls: ['./user-hub.component.css']
})
export class UserHubComponent implements OnInit,AfterViewInit, OnDestroy {
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

  constructor(public userHubService: UserHubService, private fb: UntypedFormBuilder, private userService: UserService,private _snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      id: [0],
      userName: ['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required, Validators.minLength(4)]],
      password2:['',[Validators.required, Validators.minLength(4)]],
      idRole:['1',[Validators.required]]
     });
   }

   ngOnDestroy(): void {
    this.authSubcription?.unsubscribe();
    this.userSubcrition?.unsubscribe();
  }

  ngOnInit(): void {
    //console.log("init");
    this.authSubcription = this.userService.authChange.subscribe(statusUser =>{
      this.isAuth = statusUser;
    });
    this.userHubService.startConnection();
    this.userHubService.listeningUsers();
  }

  ngAfterViewInit(): void {
    this.userLength = this.users.length;
    this.userHubService.httpStartRequest();
    this.listeningUsers();
  }

  public listeningUsers(){
    this.userSubcrition = this.userHubService.usersUpdate.subscribe(() =>{
      this.users = this.userHubService.getUsers();
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log("user: " + this.users);
    });
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
        //this.cleanInputRegister();
        this.registerForm.reset();
        this.alertUpdate("Inserimento effettuato con successo!");
      }
      else{
      }
    });
  }

  updateUser(){
   this.loading=true
    this.userService.updateUser(this.registerForm.value).subscribe((resp) =>{
      console.log("Update", resp)
      if(resp){
        console.log({resp});
        this.loading = false;
        //this.cleanInputRegister();
        //this.registerForm.reset();
        this.alertUpdate("Aggiornamento effettuato con successo!");
      }
      else{
      }
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

  alertUpdate(messagge: string){
    this._snackBar.open(messagge,"",{
      duration: 2000,
      horizontalPosition:"center",
      verticalPosition: "bottom"
    });
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(resp =>{
      console.log(resp);
      this.registerForm.reset();
      this.alertUpdate("Eliminazione è stata effettuata con successo!")
    });
  }

  selectRow(user: IUser){
    //this.user = user;
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
    this.registerForm.reset();
  }
}
