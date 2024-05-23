import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseInputErrorsComponent } from '../base-input-errors/base-input-errors.component';

@Component({
  selector: 'myinput',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputErrorsComponent],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss'
})
export class BaseInputComponent {
  @Input() labelId!:string;
  @Input() inputType:string ="text";
  @Input() inputPlaceholder!:string;
  @Input() labelText!:string;
  @Input() controlName!:string;
  @Input() formGroup!:FormGroup;
  
  /**
   *
   */
  constructor(
    private controlContainer:ControlContainer
  ) {
    
  }

  get form(){
    if(this.controlContainer?.formDirective)
    {
      return (this.controlContainer.formDirective as FormGroupDirective).form
    }
    throw new Error("form error")
  }




}
