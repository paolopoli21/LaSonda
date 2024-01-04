import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { VcollectorsComponent } from './vcollectors/vcollectors.component';

const routes: Routes = [{
  path: '',
  component: MainNavComponent,
  children:[
    {
      path:'collectors',
      component: VcollectorsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcollectorsRoutingModule { }
