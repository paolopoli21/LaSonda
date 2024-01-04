import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from 'src/app/auth/auth-user.guard';
import { MainNavComponent } from './main-nav.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'home', component: MainNavComponent
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/monitorings/monitoring.module").then(module => module.MonitoringModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages//monitoring-hub/monitoring-hub.module").then(module => module.MonitoringHubModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/monitoringsRealTime/monitoring-real-time.module").then(module => module.MonitoringRealTimeModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/tracer/tracer.module").then(module => module.TracerModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/select-db/select-db.module").then(module => module.SelectDbModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/user/user.module").then(module => module.UserModule)
      },
      {
        path: '',
        loadChildren: () => import("../../top/login/login.module").then(module => module.LoginModule)
      },
      // {
      //   path: 'home',
      //   loadChildren: () => import("../../pages/dataprocess/dataprocess.module").then(module => module.DataprocessModule)
      // },
      {
        path: 'home',
        loadChildren: () => import("../../pages/vdataprocess/vdataprocess.module").then(module => module.VdataprocessModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/user-hub/user-hub.module").then(module => module.UserHubModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/prioritacolore-hub/prioritacolore-hub.module").then(module => module.PrioritacoloreHubModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/backup-sql/backup-sql.module").then(module => module.BackupSqlModule)
      },
      {
        path: 'home',
        loadChildren: () => import("../../pages/vulnerability/vulnerability.module").then(module => module.VulnerabilityModule)
      }
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainNavRoutingModule { }
