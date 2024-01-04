import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserAdministratorGuard } from 'src/app/auth/auth-user-administrator.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { SelectDbComponent } from './select-db/select-db.component';

const routes: Routes = [
  {
    path:'',
    component: MainNavComponent,
    children:[
      { path:'selectdb', component: SelectDbComponent, canActivate: [AuthUserAdministratorGuard] }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectDbRoutingModule { }
