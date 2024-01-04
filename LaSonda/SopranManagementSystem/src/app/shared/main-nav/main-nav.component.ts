import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  public userName: string | undefined = "" ;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private userService: UserService, private authService: MsalService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    //this.userName = localStorage.getItem("userName")?.toString();
    this.userName = this.userService.user?.userName;
  }

  logout(){
    //localStorage.setItem("userName","");
    localStorage.clear();
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
      //this.router.navigateByUrl("/home");
    });
  }

  goToUsers(){
    this.router.navigateByUrl("home/users");
  }

  goToUsersHub(){
    this.router.navigateByUrl("home/usersHub");
  }

  isAdmin(): boolean{
    return this.userService.isAdmin();
  }

}
