import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IPublisher } from '../../../shared/models/publisher';

@Component({
  selector: 'app-update-publisher',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-publisher.component.html',
  styleUrl: './update-publisher.component.scss'
})
export class UpdatePublisherComponent implements OnInit{
  updatePublisherForm!:FormGroup;
  publisher!:IPublisher
  controller="Publishers"

  constructor(
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
        gettingData.subscribe((dd:IPublisher)=>{
        this.publisher=dd;
        this.createForm(dd);
      })
    });
  }
  createForm(data:IPublisher){
    this.updatePublisherForm = this.fb.group({
      id: [data.id, [
        Validators.required,
      ]],
      name: [data.name, [
        Validators.required,
      ]],
      language: [data.language, [
        Validators.required
      ]]
    });
  }

  UpdatePublisherSubmit(data:any){
    if(this.updatePublisherForm.valid){
    this.crudservice.put({controller:this.controller},data).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/publisher']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }

}
