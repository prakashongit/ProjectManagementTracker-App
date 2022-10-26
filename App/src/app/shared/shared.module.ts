import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { FormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard'


@NgModule({
  declarations: [PaginationPipe],
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule
  ],
  exports:[PaginationPipe, CommonModule, FormsModule, ClipboardModule]
})
export class SharedModule { }
