import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { EAnnoucementTag, IAnnoucement } from '../../../shared/models/annoucement';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent implements OnInit{
  addAnnouncementForm!:FormGroup;
  controller="Announcements"
  textArea!:string;
  
  announceTags=Object.values(EAnnoucementTag).filter(key => typeof key === 'string');
  announceTagsValue=Object.values(EAnnoucementTag).filter(key => typeof key === 'number');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private crudService:CrudService,
    private alertify:AlertifyService
  ) {
  }
  ngOnInit(): void {
    this.addAnnouncementForm = this.fb.group({
      title: ["", [
        Validators.required
      ]],
      content: ["", [
        Validators.required
      ]],
      tag: ["", [
        Validators.required
      ]],
      file: [, [
        Validators.required
      ]]
    });
  }
  AddAnnouncementSubmit(data:IAnnoucement){
    console.log(data)
    this.textAreaValue();
    const formData = new FormData();
    console.log(this.addAnnouncementForm.get('content')?.value )
    const text = this.addAnnouncementForm.get('content')?.value

    const getFileImage= this.addAnnouncementForm.get('file')?.value
    console.log(formData.get('file'))
    if(getFileImage ){
      formData.append("file",getFileImage);
      formData.append("title",data.title);
      formData.append("content",text);
      formData.append("tag",`${data.tag}`);
    }

    if(this.addAnnouncementForm.valid){
      this.crudService.addImage<IAnnoucement>({
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
    console.log(image)
    this.addAnnouncementForm.patchValue(
       {file:image}
    )
  }
  textAreaValue(){
    const elm =document.getElementById('floatingTextarea') as HTMLTextAreaElement;
    const value = (elm ).value;
    console.log(value);
    this.addAnnouncementForm.patchValue(
      {content:value}
   )
  }

}
