import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager-routing.module';
import { TeamManagerComponent } from './team-manager/team-manager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TeamManagerComponent],
  imports: [
    SharedModule,
    ManagerRoutingModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    AlertModule.forRoot()
  ]
})
export class ManagerModule { }
