import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { PrioritacoloreHubComponent } from './prioritacolore-hub/prioritacolore-hub.component';

const routes: Routes = [
  { 
    path:'',
      component: MainNavComponent,
      children:[
        {path:'prioritacoloriHub', component: PrioritacoloreHubComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrioritacoloreHubRoutingModule { }
