import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { IAuthor } from '../../../shared/models/author';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.scss'
})
export class UpdateAuthorComponent implements OnInit{
  updateAuthorForm!:FormGroup;
  controller="Authors"
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService,
    private router: Router
  ) {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe(async (dd:IAuthor)=>{
       await this.createForm(dd);
      })
    });
  }
  ngOnInit(): void {

  }
  createForm(data:IAuthor){
    this.updateAuthorForm = this.fb.group({
      id: [data.id, [
        Validators.required,
      ]],
      firstName: [data.firstName, [
        Validators.required,
      ]],
      lastName: [data.lastName, [
        Validators.required
      ]]
    });
  }
  UpdateAuthorSubmit(data:any){
    if(this.updateAuthorForm.valid){
    this.crudservice.put({controller:this.controller},data).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/author']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }

}
