import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { BehaviorSubject, catchError, delay, throwError } from 'rxjs';
import { categoryListConst, LocationListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { IBook } from '../../../shared/models/book';
import { ILocation } from '../../../shared/models/location';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit{
  addBookForm!:FormGroup;
  controllerBook="Books"
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];
  locationSearchList!:ILocation[];
  imageFile!:any;

  // search Categorie input values
  searchCategoryController:string ="Categories";
  searchCategorieInputValues="";
  searchCategoryType= categoryListConst;


  // search Publisher input values
  searchPublisherController:string ="Publishers";
  searchPublisherInputValues="";
  searchPublisherTypeList:any[]=publisherListConst;
  // search Location input values
  searchLocationController:string ="Locations";
  searchLocationInputValues="";
  searchLocationTypeList:any[]=LocationListConst;
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
    this.addBookForm = this.fb.group({
      isbnCode: ["", [
        Validators.required
      ]],
      bookTitle: ["", [
        Validators.required
      ]],
      bookEdition: [, [
        Validators.required
      ]],
      file: ["", [
        Validators.required
      ]],
      releaseDate: ["", [
        Validators.required
      ]],
      locationId: [, [
        Validators.required
      ]],
      pageCount: ["", [
        Validators.required
      ]],
      publisherId: ["", [
        Validators.required
      ]],
      categoryId: ["", [
        Validators.required
      ]]
    });
  }

  AddBookSubmit(data:IBook){
    console.log(data)
    const formData = new FormData();
    const getFileSource = this.addBookForm.get('file')?.value
    if(getFileSource){
      formData.append("file",getFileSource);
      formData.append("isbnCode",data.isbnCode);
      formData.append("bookTitle",data.bookTitle);
      formData.append("bookEdition",`${data.bookEdition}`);
      formData.append("releaseDate",`${data.releaseDate}`);
      formData.append("locationId",data.locationId!);
      formData.append("pageCount",`${data.pageCount}`);
      formData.append("publisherId",data.publisherId!);
      formData.append("categoryId",data.categoryId!);
    }
    if(this.addBookForm.valid){
      this.crudService.addImage<IBook>({
        controller:this.controllerBook,
      },formData)
      .pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      }))
      .subscribe((data)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      // this.router.navigate(['admin/book']);

      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  uploadImage(data:any){
     const file =data.target.files[0];
     this.addBookForm.patchValue(
      {file:file}
     )
  }
  searchPublisherList(data:any){
    this.publisherSearchList = data;
  }
  searchCategoryList(data:any){
    this.CategorySearchList = data;
  }
  searchLocationList(data:any){
    this.locationSearchList = data;
  }
}
