import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { categoryListConst } from '../../../shared/constants/SearchTypeList';
import { IEBook } from '../../../shared/models/allMaterials';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-e-book',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './add-e-book.component.html',
  styleUrl: './add-e-book.component.scss'
})
export class AddEBookComponent implements OnInit{
  addEBookForm!:FormGroup;
  controllerEBook="EBooks";
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];
  imageFile!:any;
  


  // search Category input values
  searchCategoryController:string ="Categories";
  searchCategoryInputValues="";
  searchCategoryType= categoryListConst;
  searchPagination:boolean=false;


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
    this.addEBookForm = this.fb.group({
      isbnCode: ["", [
        Validators.required
      ]],
      eBookTitle: ["", [
        Validators.required
      ]],
      authorName: ["", [
        Validators.required
      ]],
      fileImage: ["", [
        Validators.required
      ]],
      file: ["", [
        Validators.required
      ]],
      releaseDate: ["", [
        Validators.required
      ]],
      pageCount: ["", [
        Validators.required
      ]],
      categoryId: ["", [
        Validators.required
      ]]
    });
  }
  AddBookSubmit(data:IEBook){
    const formData = new FormData();
    const getFilePdf = this.addEBookForm.get('file')?.value
    const getFileImage = this.addEBookForm.get('fileImage')?.value
    if(getFilePdf && getFileImage ){
      formData.append("file",getFilePdf);
      formData.append("fileImage",getFileImage);
      formData.append("iSBNCode",data.isbnCode);
      formData.append("eBookTitle",data.eBookTitle);
      formData.append("authorName",data.authorName);
      formData.append("releaseDate",`${data.releaseDate}`);
      formData.append("pageCount",`${data.pageCount}`);
      formData.append("categoryId",data.categoryId!);
    }
    if(this.addEBookForm.valid){
      this.crudService.addImage<IEBook>({
        controller:this.controllerEBook,
      },formData)
      .pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error.message, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      }))
      .subscribe((data)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['admin/all-materials/e-book']);
      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
uploadImage(data:any){
  const image =data.target.files[0];
  this.addEBookForm.patchValue(
     {fileImage:image}
  )
 }
 uploadPDF(data:any){
  const pdf =data.target.files[0];
  this.addEBookForm.patchValue(
   {file:pdf}
  )
 }
 searchPublisherList(data:any){
   this.publisherSearchList = data;
 }
 searchCategoryList(data:any){
   this.CategorySearchList = data;
 }


}
