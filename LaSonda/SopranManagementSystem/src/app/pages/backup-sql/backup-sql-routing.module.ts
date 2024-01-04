import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from 'src/app/auth/auth-user.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { BackupSqlComponent } from './backup-sql/backup-sql.component';

const routes: Routes = [{
  path:'',
  component: MainNavComponent,
  children:[
    {
      path: "backupSql", component: BackupSqlComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupSqlRoutingModule { }
