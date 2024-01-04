import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';

//const base_url: string = "http://localhost:5000/api/user";
const base_url: string = environment.urlService + "/api/user";
const headers = { "Content-Type": "x-custom-header"};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: IUser;
  public users: IUser[] = [];
  public usersUpdate = new Subject();
  public userUpdate = new Subject();

  public authChange = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  login(formData: IUser){
    return this.httpClient.post<IUser>(`${ base_url }`, formData)
              .pipe(
                tap((resp:IUser) =>{
                  this.user = resp;
                  this.userUpdate.next(this.user);
                })
              );
  }

  // login(formData: IUser){
  //   return this.httpClient.post<IUser[]>(`${ base_url }`, formData).subscribe((resp: IUser[]) => {
  //     this.user = resp[0];
  //     this.userUpdate.next(this.user);
  //   });
             
  // }

  loginUp(formData: IUser){
    //console.log({formData})
    return this.httpClient.post<IUser>(`${ base_url }/insert`, formData)
              .pipe(
                tap((resp:any) =>{
                  // localStorage.clear();
                  // localStorage.setItem("userName", resp.userName);
                })
              );
  }

  public getUsers(){
    return [...this.users];
  }

  public getUser(){
    return this.user;
  }

  httpStartRequest(){
    return this.httpClient.get<IUser[]>(base_url + '/users').subscribe(data =>{
      this.users = data;
      this.usersUpdate.next(this.users);
    });
  }

  updateUser(formData?: IUser){
    return this.httpClient.put(`${ base_url }/update`, formData);
  }

  deleteUser(id:number){
    return this.httpClient.delete(`${ base_url }/delete/${id}`,  { headers });
  }

  isAdmin(): boolean{
    return this.user?.idRole == 1
  }

  isLogin():boolean{
    return this.user != null;
  }

  logout(){
    this.authChange.next(false);
  }

  private authSuccessfully(){
    this.authChange.next(true);
  }
}
