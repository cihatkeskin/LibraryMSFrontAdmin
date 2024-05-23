import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { searchInputValue } from '../../models/searchInput';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  /**
   *
   */
  constructor(
    private crudService:CrudService,
    private alertify:AlertifyService
  ) {
    
  }
  
  @Input() searchInputValues!:String;
  @Input() searchInputPlaceHolder!:String;
  @Input() searchCategoryList!:searchInputValue[];
  @Input() selectedSearchCategory!:string;
  @Input() searchController!:string;
  @Input() existSearch!:boolean;

  @Output() searchList = new EventEmitter<any[]>();
  


  ngOnInit(): void {

  }
  changeInput(event:any){
    this.searchInputValues = event.target.value;
  }
  changeSelectbox(event:any){
    this.selectedSearchCategory = event.target.value;
  }
  search(){

    if((this.searchInputValues != '' ) && (this.selectedSearchCategory != 'null') && (!this.existSearch)){
    this.crudService.search<IListRequest>({controller:this.searchController},0,10,this.selectedSearchCategory,this.searchInputValues)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    }))
    .subscribe((data)=>{
      let value=data.items
      this.searchListEvent(value);
    });
    }
    else 
    {
      let value:object={value:this.searchInputValues,category:this.selectedSearchCategory}
      this.searchListEvent(value);
    }
  }
  searchListEvent(value:any){
    return this.searchList.emit(value);
  }
}
