import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaginationPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[PaginationPipe, CommonModule, FormsModule]
})
export class SharedModule { }
