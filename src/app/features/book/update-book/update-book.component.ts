import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { IAuthor } from '../../../shared/models/author';
import { EBookStatus, IBook } from '../../../shared/models/book';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { BehaviorSubject, catchError, ReplaySubject, throwError } from 'rxjs';
import { categoryListConst, LocationListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
import { CommonModule } from '@angular/common';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { ILocation } from '../../../shared/models/location';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent implements OnInit{
  bookId!:string;
  book!:IBook;

  authors!:IAuthor[];
  updateBookForm!:FormGroup;
  controller="Books"
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];
  locationSearchList!:ILocation[];


  // search Category input values
  searchCategoryController:string ="Categories";
  searchCategorieInputValues="";
  searchCategoryType= categoryListConst;


  // search Publisher input values
  searchPublisherController:string ="Publishers";
  searchPublisherInputValues="";
  searchPublisherTypeList:any[]=publisherListConst;
  searchPagination:boolean=false;
  // search Location input values
  searchLocationController:string ="Locations";
  searchLocationInputValues="";
  searchLocationTypeList:any[]=LocationListConst;
  
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
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
      gettingData.subscribe((dd:IBook)=>{
        this.createForm(dd);
        this.book =dd;
      })
    });

  }
  createForm(book:IBook){
    console.log(book);
    this.updateBookForm = this.fb.group({
      id: [book.id, [
        Validators.required
      ]],
      isbnCode: [book.isbnCode, [
        Validators.required
      ]],
      locationId: [book.location?.id, [
        Validators.required
      ]],
      bookTitle: [book.bookTitle, [
        Validators.required
      ]],
      bookEdition: [book.bookEdition, [
        Validators.required
      ]],
      releaseDate: [book.releaseDate, [
        Validators.required
      ]],
      pageCount: [book.pageCount, [
        Validators.required
      ]],
      publisherId: [book.publisherId, [
        Validators.required
      ]],
      categoryId: [book.categoryId, [
        Validators.required
      ]],
      file: [book.imageUrl, [
        Validators.required
      ]]
    });
  }

  getParamsId():string{
    let id:string="";
    this.route.params.subscribe(params=>{
        id = params['id'];
    });
    return id;
  }

  UpdateBookSubmit(data:IBook){
    console.log(data);
    const formData = new FormData();
    const getFileSource = this.updateBookForm.get('file')?.value

    if(getFileSource ){
      formData.append("file",getFileSource);
      formData.append("isbnCode",data.isbnCode);
      formData.append("bookTitle",data.bookTitle);
      formData.append("bookEdition",`${data.bookEdition}`);
      formData.append("releaseDate",`${data.releaseDate}`);
      formData.append("locationId",data.locationId!);
      formData.append("pageCount",`${data.pageCount}`);
      formData.append("publisherId",data.publisherId!);
      formData.append("categoryId",data.categoryId!);
      formData.append("id",data.id!);
      formData.append("status",`1`);

    }
    if(this.updateBookForm.valid){
    this.crudservice.put({controller:this.controller},formData).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error.mesage, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/book']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }

  uploadImage(data:any){
    const image =data.target.files[0];
    this.updateBookForm.patchValue(
       {file:image}
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
