import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserAdministratorGuard } from 'src/app/auth/auth-user-administrator.guard';
import { AuthUserGuard } from 'src/app/auth/auth-user.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { DataprocessComponent } from './dataprocess/dataprocess.component';

const routes: Routes = [
  {
    path:'',
    component: MainNavComponent,
    children:[
      {path:'xxxx', component: DataprocessComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataprocessRoutingModule { }
