import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'',
  //   loadChildren: () => import("./pages/monitorings/monitoring.module").then(module => module.MonitoringModule)
  // },
  {
    path: '',
    loadChildren: () => import("./shared/main-nav/main-nav.module").then(module => module.MainNavModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
