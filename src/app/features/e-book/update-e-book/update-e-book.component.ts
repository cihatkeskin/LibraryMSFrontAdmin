import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { IEBook } from '../../../shared/models/allMaterials';
import { HttpErrorResponse } from '@angular/common/http';
import { categoryListConst } from '../../../shared/constants/SearchTypeList';
import { ICategory } from '../../../shared/models/category';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-e-book',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-e-book.component.html',
  styleUrl: './update-e-book.component.scss'
})
export class UpdateEBookComponent implements OnInit{
  updateEBookForm!:FormGroup;
  controller="EBooks"
  eBook!:IEBook;
  // search Categorie  values
  CategorySearchList!:ICategory[];
  searchCategoryController:string ="Categories";
  searchCategorieInputValues="";
  searchCategoryType= categoryListConst;
  searchPagination:boolean=false;

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
      gettingData.subscribe((dd:IEBook)=>{
        this.eBook=dd;
        this.createForm(dd);
      })
    });
  }
  createForm(data:IEBook){
    this.updateEBookForm = this.fb.group({
      id: [data.id, [
        Validators.required
      ]],
      isbnCode: [data.isbnCode, [
        Validators.required
      ]],
      eBookTitle: [data.eBookTitle, [
        Validators.required
      ]],
      authorName: [data.authorName, [
        Validators.required
      ]],
      fileUrl: [data.imageUrl, [
        Validators.required
      ]],
      file: [data.fileUrl, [
        Validators.required
      ]],
      releaseDate: [data.releaseDate, [
        Validators.required
      ]],
      pageCount: [data.pageCount, [
        Validators.required
      ]],
      categoryId: [data.categoryId, [
        Validators.required
      ]]
    });
  }
  UpdateEBookSubmit(data:IEBook){
    console.log(data)
    const formData = new FormData();
    const getFilePdf = this.updateEBookForm.get('file')?.value
    const getFileImage = this.updateEBookForm.get('fileUrl')?.value
    if(getFilePdf && getFileImage ){
      formData.append("id",data.id);
      formData.append("file",getFilePdf);
      formData.append("fileUrl",getFileImage);
      formData.append("iSBNCode",data.isbnCode);
      formData.append("eBookTitle",data.eBookTitle);
      formData.append("authorName",data.authorName);
      formData.append("releaseDate",`${data.releaseDate}`);
      formData.append("pageCount",`${data.pageCount}`);
      formData.append("categoryId",data.categoryId!);
    }
    if(this.updateEBookForm.valid){
    this.crudservice.put({controller:this.controller},formData).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/all-materials/e-book']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  searchCategoryList(data:any){
    this.CategorySearchList = data;
  }
  uploadImage(data:any){
    const image =data.target.files[0];
    this.updateEBookForm.patchValue(
       {fileImage:image}
    )
   }
   uploadPDF(data:any){
    const pdf =data.target.files[0];
    this.updateEBookForm.patchValue(
     {file:pdf}
    )
   }

}
