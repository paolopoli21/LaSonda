import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserAdministratorGuard } from 'src/app/auth/auth-user-administrator.guard';
import { AuthUserGuard } from 'src/app/auth/auth-user.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { MonitoringRealTimeComponent } from './monitoring-real-time/monitoring-real-time.component';

const routes: Routes = [
  {
    path:'',
    component: MainNavComponent,
    children:[
      {path:'monitoringRealTime', component: MonitoringRealTimeComponent, canActivate:[AuthUserGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRealTimeRoutingModule { }
