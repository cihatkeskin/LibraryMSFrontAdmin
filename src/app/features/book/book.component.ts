import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../core/services/alertify/alertify.service';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { IBook } from '../../shared/models/book';
import { RouterModule } from '@angular/router';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { BehaviorSubject } from 'rxjs';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { BookListConst } from '../../shared/constants/SearchTypeList';




@Component({
  selector: 'app-book',
  standalone: true,
  imports: [HttpClientModule,CommonModule,DeleteModule,RouterModule,SearchComponent,PaginationComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  bookList!:IBook[];
  bookList$ = new BehaviorSubject<IBook[]>([]);
  controller:string="Books";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.bookList$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.bookList$
  };
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  // search Magazine input values
  searchBookInputValues="";
  searchBookType= BookListConst;
  /**
   *
   */



  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
    ) {
  }
  ngOnInit(): void {
  }
  
  searchList(data:any){
    this.searchBookInputValues=data.value;
    this.searchSelectedCategory =data.category
  }
}
