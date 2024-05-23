import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { categoryListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { EMaterialType, IMaterial } from '../../../shared/models/allMaterials';

@Component({
  selector: 'app-update-material',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './update-material.component.html',
  styleUrl: './update-material.component.scss'
})
export class UpdateMaterialComponent implements OnInit{
  updateMaterialForm!:FormGroup;
  controller="Materials";
  material!:IMaterial;
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];
  materialTags=Object.values(EMaterialType).filter(key => typeof key === 'string');
  materialTagsValue=Object.values(EMaterialType).filter(key => typeof key === 'number');

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
    private router: Router,
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService
  ) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe((dd:IMaterial)=>{
        this.material=dd;
        this.createForm(dd);
      })
    });
  }
  UpdateMaterialSubmit(data:any){
    if(this.updateMaterialForm.valid){
    this.crudservice.put({controller:this.controller},data).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['admin/all-materials/material']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  createForm(data:IMaterial){
    this.updateMaterialForm = this.fb.group({
      id: [data.id, [
        Validators.required
      ]],
      name: [data.name, [
        Validators.required
      ]],
      materialType: [data.materialType, [
        Validators.required
      ]],
      releaseDate: [data.releaseDate, [
        Validators.required
      ]],
      publisherId: [ data.publisherId, [
        Validators.required
      ]],
      categoryId: [data.categoryId, [
        Validators.required
      ]]
    });
  }
  searchPublisherList(data:any){
    this.publisherSearchList = data;
  }
  searchCategoryList(data:any){
    this.CategorySearchList = data;
  }

}
