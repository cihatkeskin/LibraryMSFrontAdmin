import { CommonModule, FormStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { categoryListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMaterialType, IMaterial } from '../../../shared/models/allMaterials';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent,FormsModule],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.scss'
})
export class AddMaterialComponent implements OnInit{
  addMaterialForm!:FormGroup;
  ControllerMaterial:string='Materials';
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
    private crudService:CrudService,
    private alertify:AlertifyService
  ) {
    
  }
  ngOnInit(): void {

    this.addMaterialForm = this.fb.group({
      name: ["", [
        Validators.required
      ]],
      materialType: [1, [
        Validators.required
      ]],
      releaseDate: ["", [
        Validators.required
      ]],
      publisherId: [ "", [
        Validators.required
      ]],
      categoryId: ["", [
        Validators.required
      ]]
    });
  }
  addMaterialSubmit(data:any){
    console.log(data);
    if(this.addMaterialForm.valid){
      this.crudService.post<IMaterial>({controller:this.ControllerMaterial},data).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe((data:IMaterial)=>{
      this.alertify.message('Success Added', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.router.navigate(['/admin/all-materials/material']);

      })      
    }else{
      this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }
  searchPublisherList(data:IPublisher[]){
    this.publisherSearchList = data
  }
  searchCategoryList(data:any){
    this.CategorySearchList = data;
  }
}
