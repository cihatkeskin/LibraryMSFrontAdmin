import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { IStaff } from '../../../shared/models/staff';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-staff',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent],
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent implements OnInit{
  createStaffForm!:FormGroup;
  controllerBook="LibraryStaffs"
  imageFile!:any;


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
    this.createStaffForm = this.fb.group({
      firstName: ["", [
        Validators.required
      ]],
      lastName: ["", [
        Validators.required
      ]],
      email: [, [
        Validators.required,
        Validators.email
      ]],
      file: ["", [
        Validators.required
      ]],
      birthDate: ["", [
        Validators.required
      ]],
      password: [, [
        Validators.required
      ]]
    });
  }
  AddBookSubmit(data:IStaff){
    console.log(data)
    const formData = new FormData();
    const getFileSource = this.createStaffForm.get('file')?.value
    if(getFileSource){
      formData.append("file",getFileSource);
      formData.append("FirstName",data.firstName);
      formData.append("lastName",data.lastName);
      formData.append("email",data.email);
      formData.append("birthDate",`${data.birthDate}`);
      formData.append("password",data.password!);
    }
    if(this.createStaffForm.valid){
      this.crudService.addImage<IStaff>({
        controller:this.controllerBook,
      },formData)
      .pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      }))
      .subscribe((data)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['admin/dashboard']);

      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  uploadImage(data:any){
     const file =data.target.files[0];
     this.createStaffForm.patchValue(
      {file:file}
     )
  }
}
