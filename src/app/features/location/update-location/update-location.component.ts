import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILocation } from '../../../shared/models/location';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { catchError, pipe, ReplaySubject, throwError } from 'rxjs';
import { CrudService } from '../../../core/services/crud/crud.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-location',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-location.component.html',
  styleUrl: './update-location.component.scss'
})
export class UpdateLocationComponent implements OnInit{
  updateLocationForm!:FormGroup;
  controller="Locations"

  /**
   *
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService
  ) {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe(async (dd:ILocation)=>{
        await this.createForm(dd);
        console.log(this.updateLocationForm)
      })
    });
  }
  ngOnInit(): void {

  }
  UpdateLocationSubmit(data:any){
    if(this.updateLocationForm.valid){
    this.crudservice.put({controller:this.controller},data).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error.message, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Updated', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/location']);

    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  createForm(location:ILocation){
    console.log(location)
    this.updateLocationForm = this.fb.group({
      id: [location.id, [
        Validators.required
      ]],
      name: [location.name, [
        Validators.required,
      ]],
      floorNo: [location.floorNo, [
        Validators.required
      ]],
      shelfName: [location.shelfName, [
        Validators.required
      ]],
      shelfNo: [location.shelfNo, [
        Validators.required
      ]]
    });
  }

}
