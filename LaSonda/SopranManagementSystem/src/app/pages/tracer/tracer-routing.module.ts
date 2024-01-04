import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserAdministratorGuard } from 'src/app/auth/auth-user-administrator.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { TracerComponent } from './tracer/tracer.component';

const routes: Routes = [
  { 
    path:'',
      component: MainNavComponent,
      children:[
        {path:'tracer', component: TracerComponent, canActivate: [AuthUserAdministratorGuard] }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracerRoutingModule { }
