import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserAdministratorGuard } from 'src/app/auth/auth-user-administrator.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { 
    path:'',
      component: MainNavComponent,
      children:[
        {path:'users', component: UserComponent, canActivate:[AuthUserAdministratorGuard]},
        {path:'users', component: UserComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
