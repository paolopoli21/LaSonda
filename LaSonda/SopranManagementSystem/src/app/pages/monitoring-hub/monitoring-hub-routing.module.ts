import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from 'src/app/auth/auth-user.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { MonitoringHubComponent } from './monitoring-hub/monitoring-hub.component';

const routes: Routes = [
  {
    path:'',
    component: MainNavComponent,
    children:[
      {path:'monitoringHub', component: MonitoringHubComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringHubRoutingModule { }
