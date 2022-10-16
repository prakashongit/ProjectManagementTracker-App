import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagerComponent } from './team-manager/team-manager.component';

const routes: Routes = [{
  path:'', component: TeamManagerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
