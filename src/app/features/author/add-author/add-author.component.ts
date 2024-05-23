import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthor } from '../../../shared/models/author';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.scss'
})
export class AddAuthorComponent implements OnInit{
  addAuthorForm!:FormGroup;

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
    this.addAuthorForm = this.fb.group({
      firstName: ["", [
        Validators.required,
      ]],
      lastName: ["", [
        Validators.required
      ]]
    });
  }
  addAuthorSubmit(data:any){
    if(this.addAuthorForm.valid){
      this.crudService.post<IAuthor>({controller:'Authors'},data).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe((data:IAuthor)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['/admin/author']);
      })      
    }else{
      this.alertify.message('Please Fill All The Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }

}
