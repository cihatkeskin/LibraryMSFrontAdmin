import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDirective } from './delete.directive';
import { DeleteComponent } from '../../dialogs/delete/delete.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DeleteDirective,
    DeleteComponent,
  ],
  exports:[
    DeleteDirective,
    DeleteComponent
  ]
})
export class DeleteModule { }
