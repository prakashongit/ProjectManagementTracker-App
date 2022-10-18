import { NgModule } from '@angular/core';
import { MemberRoutingModule } from './member-routing.module';
import { TeamMemberComponent } from './team-member/team-member.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TeamMemberComponent],
  imports: [
    MemberRoutingModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    SharedModule
  ]
})
export class MemberModule { }
