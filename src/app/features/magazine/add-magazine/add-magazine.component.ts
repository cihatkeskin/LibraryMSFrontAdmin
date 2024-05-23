import { Component, OnInit, Renderer2 } from '@angular/core';
import { BaseInputComponent } from '../../../shared/components/base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { IMagazine } from '../../../shared/models/allMaterials';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service'
import { SearchComponent } from '../../../shared/components/search/search.component';
import { IPublisher } from '../../../shared/models/publisher';
import { ICategory } from '../../../shared/models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { categoryListConst, publisherListConst } from '../../../shared/constants/SearchTypeList';
declare var $:any;

@Component({
  selector: 'app-add-magazine',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,SearchComponent],
  templateUrl: './add-magazine.component.html',
  styleUrl: './add-magazine.component.scss',
  providers:[]
})
export class AddMagazineComponent implements OnInit{
  addMagazineForm!:FormGroup;
  ControllerMagazine:string='Magazines'
  publisherSearchList!:IPublisher[];
  CategorySearchList!:ICategory[];

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
    this.addMagazineForm = this.fb.group({
      issnCode: ["", [
        Validators.required
      ]],
      magazineTitle: ["", [
        Validators.required
      ]],
      number: ["", [
        Validators.required
      ]],
      releaseDate: ["", [
        Validators.required
      ]],
      publisherId: ['', [
        Validators.required
      ]],
      categoryId: ['', [
        Validators.required
      ]]
    });
  }
  addMagazineSubmit(data:any){
    console.log(data)
    if(this.addMagazineForm.valid){
      this.crudService.post<IMagazine>({controller:this.ControllerMagazine},data).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      })).subscribe((data:IMagazine)=>{
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
  // SelectedPublisher(){
  //   var elm = document.getElementById('selectedPublisher');
  //   var id = elm?.getAttribute('value');
  //   return this.selectedPublisher$.next(id!);
  // }
  // changeSelectCategory(){
  //   var elm = document.getElementById('selectedCategory');
  //   var id = elm?.getAttribute('value');
  //   return this.selectedCategory$.next(id!);
  // }
}
