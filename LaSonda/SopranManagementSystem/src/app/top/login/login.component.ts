import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, IPublicClientApplication, InteractionStatus } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { ShareService } from 'src/app/services/share.service';
import { UserValidService } from 'src/app/services/user-valid.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public value: string = 'Clear me';

  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public isLogIn: boolean = true;
  public isRegister: Boolean = true;
  public isLoading = false;

  durationInSeconds = 1;

  userLoginIn: boolean = false;

  httpOptions: any;

  constructor(private router: Router, private fb: UntypedFormBuilder, private userService: UserService, private userValidService: UserValidService, 
    private shareService: ShareService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private http: HttpClient
    
    ) {
      this.loginForm = this.fb.group({
        userName: ['',[Validators.required,Validators.minLength(2)]],
        password:['',[Validators.required, Validators.minLength(4)]]
      });
      
      this.registerForm = this.fb.group({
          userName: ['',[Validators.required,Validators.minLength(2)]],
          password:['',[Validators.required, Validators.minLength(4)]],
          password2:['',[Validators.required, Validators.minLength(4)]],
          idRole:['1',[Validators.required]]
        },
        {
          validator: this.userValidService.passwordMatchValidator("password", "password2")
        }
      );
   }

  ngOnInit(): void {
    localStorage.clear();
  }

  singIn(){
    this.isLoading = true;
    this.userService.login(this.loginForm.value).subscribe((user:any) =>{
      if(user && user.length >0){
        localStorage.setItem("userName", user[0].userName);

    const accountSub = this.msalBroadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          map(() => {
            const instance: IPublicClientApplication = this.msalService.instance;
            const activeAccount: AccountInfo | null = instance.getActiveAccount();
            const accounts: AccountInfo[] = instance.getAllAccounts();
            console.log("info azure",activeAccount);
            if (activeAccount != null) return activeAccount;
            if (accounts.length > 0) {
                const [firstAccount] = accounts;
                instance.setActiveAccount(firstAccount);
                console.log("User azure",firstAccount);
                return firstAccount;
            }
            //return this.msalService.instance.getAllAccounts();
            return null;
          })
        );

        console.log("info azure",accountSub);
  
        //console.log("User azure",user);
        this.isLogIn = true;
        this.isLoading  = false;
        this.router.navigateByUrl("home/monitoringHub");
        this.loginForm.reset();
        return;
      }
     this.intevalMsgUserNoValid();
     //this.alertUpdate("Password o Username non corretti!");
     this.shareService.alertUpdate("Password o Username non corretti!", 2000)
    },
    error => {
      console.log(error);
      this.shareService.alertUpdate("Errore connessione server!" + error.message, 2000)
    }
    );
  }

  singUp(){
    this.userService.loginUp(this.registerForm.value).subscribe((resp: IUser) =>{
      if(resp){
        this.isRegister = true;
        this.registerForm.reset();
        this.router.navigateByUrl("home");
        return;
      }
    });
  }

  isUsernameEmpty(){
    return  this.loginForm.get("userName")?.value == "";
  }

  isValidLoginOk(){
    return this.loginForm.valid;
  }

  isValidRegisterOk(){
    return this.registerForm.valid;
  }

  isValidPassword2(){
    return this.registerForm.get("password2")?.valid; 
  }

  isPaswordsEquals(){
    let passwordEquals: boolean = this.registerForm.get("password2")?.value == this.registerForm.get("password")?.value
    return passwordEquals;
  }

  intevalMsgUserNoValid(){
    this.isLogIn = false;
        setInterval(() => {
          this.isLogIn = true; 
          this.isLoading = false;

          }, 1000);
  }

  login(){
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        console.log("Authenticated", response);
        const instance: IPublicClientApplication = this.msalService.instance;
        this.authService.instance.setActiveAccount(response.account);
        this.getUserInfoAzure(response);
        this.router.navigateByUrl("/home/monitoringHub");
      });
  }

  logout(){
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
      //this.router.navigateByUrl("/home");
    });
  }

    getUserInfoAzure(resp: any){
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': resp.accessToken
      })
    };
    this.http.get('https://graph.microsoft.com/v1.0/users/' + resp.account.localAccountId + "?$select=department,jobtitle,companyname", this.httpOptions).subscribe(resp =>{
      console.log("infoAzure",resp);
    });
  }

}
