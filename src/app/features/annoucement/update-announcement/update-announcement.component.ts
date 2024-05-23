import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EAnnoucementTag, IAnnoucement } from '../../../shared/models/annoucement';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-announcement',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-announcement.component.html',
  styleUrl: './update-announcement.component.scss'
})
export class UpdateAnnouncementComponent implements OnInit{
  updateAnnouncementForm!:FormGroup;
  controller="Announcements"
  announceement!:IAnnoucement;
  announceTags=Object.values(EAnnoucementTag).filter(key => typeof key === 'string');
  announceTagsValue=Object.values(EAnnoucementTag).filter(key => typeof key === 'number');
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
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe((dd:IAnnoucement)=>{
        this.announceement=dd;
        this.createForm(dd);
        console.log(dd);
      })
    });
  }
  createForm(data:IAnnoucement){
    this.updateAnnouncementForm = this.fb.group({
      title: [data.title, [
        Validators.required
      ]],
      id: [data.id, [
        Validators.required
      ]],
      content: [data.content, [
        Validators.required
      ]],
      tag: [data.tag, [
        Validators.required
      ]],
      file: [data.imageUrl, [
        Validators.required
      ]]
    });
  }
  UpdateAnnouncementSubmit(data:IAnnoucement){
    console.log(data);
    this.TextAreaValue();
    const formData = new FormData();
    const text = this.updateAnnouncementForm.get('content')?.value
    const getFileImage= this.updateAnnouncementForm.get('file')?.value
    if(getFileImage ){
      formData.append("id",data.id);
      formData.append("file",getFileImage);
      formData.append("title",data.title);
      formData.append("content",text);
      formData.append("tag",`${data.tag}`);
    }

    if(this.updateAnnouncementForm.valid){
      this.crudservice.updateImage<IAnnoucement>({
        controller:this.controller,
      },formData)
      .pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      }))
      .subscribe((data)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['admin/announcement']);
      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  uploadImage(data:any){
    const image =data.target.files[0];
    this.updateAnnouncementForm.patchValue(
       {file:image}
    )
  }
  TextAreaValue(){
    const elm =document.getElementById('floatingTextarea') as HTMLTextAreaElement;
    const value = (elm ).value;
    this.updateAnnouncementForm.patchValue(
      {content:value}
   )
  }
}
