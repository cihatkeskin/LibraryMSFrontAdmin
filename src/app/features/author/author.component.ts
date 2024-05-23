import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService, MessageType, Position } from '../../core/services/alertify/alertify.service';
import { IAuthor } from '../../shared/models/author';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { LocationListConst } from '../../shared/constants/SearchTypeList';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [HttpClientModule,CommonModule,DeleteModule,RouterModule,PaginationComponent,SearchComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{
  authorList$ = new BehaviorSubject<IAuthor[]>([]);
  controller:string="Authors";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.authorList$
  }
  searchAuthorInputValues="";
  searchAuthorType= LocationListConst;
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.authorList$
  };
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  /**
   *
   */
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService
  ) {
  }

  ngOnInit(): void {
  }
  async searchList(data:any){
    this.searchAuthorInputValues=data.value;
    this.searchSelectedCategory =data.category
  }

}
