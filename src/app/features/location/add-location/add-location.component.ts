import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { ILocation } from '../../../shared/models/location';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss'
})
export class AddLocationComponent implements OnInit{
  addLocationForm!:FormGroup;
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
    this.addLocationForm = this.fb.group({
      name: ["", [
        Validators.required,
      ]],
      floorNo: ["", [
        Validators.required
      ]],
      shelfName: ["", [
        Validators.required
      ]],
      shelfNo: ["", [
        Validators.required
      ]],
    });
  }

  addLocationSubmit(data:any){
    if(this.addLocationForm.valid){
      this.crudService.post<ILocation>({controller:'Locations'},data).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe((data:ILocation)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['/admin/location-add']);
      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
}
