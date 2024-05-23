import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IPublisher } from '../../../shared/models/publisher';

@Component({
  selector: 'app-add-publisher',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent],
  templateUrl: './add-publisher.component.html',
  styleUrl: './add-publisher.component.scss'
})
export class AddPublisherComponent implements OnInit{
  addPublisherForm!:FormGroup;
  /**
   *
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private crudService:CrudService,
    private alertify:AlertifyService
  ) {
    
  }
  ngOnInit(): void {
    this.addPublisherForm = this.fb.group({
      name: ["", [
        Validators.required,
      ]],
      language: ["", [
        Validators.required
      ]]
    });
  }
  addPublisherSubmit(data:any){
    if(this.addPublisherForm.valid){
      this.crudService.post<IPublisher>({controller:'Publishers'},data).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe((data:IPublisher)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['/admin/publisher']);
      })      
    }else{
      this.alertify.message('Please Fill All The Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
}
