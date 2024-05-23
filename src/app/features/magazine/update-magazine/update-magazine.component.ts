import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { IMagazine } from '../../../shared/models/allMaterials';
import { HttpErrorResponse } from '@angular/common/http';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { categoryListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-magazine',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-magazine.component.html',
  styleUrl: './update-magazine.component.scss',
  providers:[DatePipe]
})
export class UpdateMagazineComponent implements OnInit{
  updateMagazineForm!:FormGroup;
  controller="Magazines";
  magazine!:IMagazine;
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];
  date:Date = new Date();

  // search Categorie input values
  searchCategoryController:string ="Categories";
  searchCategorieInputValues="";
  searchCategoryType= categoryListConst;


  // search Publisher input values
  searchPublisherController:string ="Publishers";
  searchPublisherInputValues="";
  searchPublisherTypeList:any[]=publisherListConst;
  searchPagination:boolean=false;

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe((dd:IMagazine)=>{
        this.magazine = dd;
        this.createForm(dd);
      })
    });
  }
  // this.datepipe.transform(myDate, 'yyyy-mm-dd')
  createForm(data:IMagazine){
    this.updateMagazineForm = this.fb.group({
      id: [data.id, [
        Validators.required
      ]],
      issnCode: [data.issnCode, [
        Validators.required
      ]],
      magazineTitle: [data.magazineTitle, [
        Validators.required
      ]],
      number: [data.number, [
        Validators.required
      ]],
      releaseDate: [this.datepipe.transform(new Date (data.releaseDate),'yyyy-MM-dd'), [
        Validators.required
      ]],
      publisherId: [data.publisherId, [
        Validators.required
      ]],
      categoryId: [data.categoryId, [
        Validators.required
      ]]
    });
  }
  UpdateMagazineSubmit(data:any){
    if(this.updateMagazineForm.valid){
    this.crudservice.put({controller:this.controller},data).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error.Title, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['admin/all-materials/magazine']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  searchPublisherList(data:any){
    this.publisherSearchList = data;
  }
  searchCategoryList(data:any){
    this.CategorySearchList = data;
  }

}
