import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { UserHubComponent } from './user-hub/user-hub.component';

const routes: Routes = [
  { 
    path:'',
      component: MainNavComponent,
      children:[
        {path:'usersHub', component: UserHubComponent}
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHubRoutingModule { }
