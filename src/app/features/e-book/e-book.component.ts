import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEBook } from '../../shared/models/allMaterials';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { EBookListConst } from '../../shared/constants/SearchTypeList';
import { SearchComponent } from '../../shared/components/search/search.component';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { LoadingService } from '../../core/services/loading/loading.service';

@Component({
  selector: 'app-e-book',
  standalone: true,
  imports: [CommonModule,DeleteModule,RouterModule,SearchComponent,PaginationComponent],
  templateUrl: './e-book.component.html',
  styleUrl: './e-book.component.scss'
})
export class EBookComponent implements OnInit{
  ebookList$ = new BehaviorSubject<IEBook[]>([]);
  controller:string="Ebooks";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.ebookList$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.ebookList$
  };
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  // search Ebook input values
  searchEBookInputValues="";
  searchEBookType= EBookListConst;
  /**
   *
   */
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
    private loadingService:LoadingService
  ) {
    
  }
  ngOnInit(): void {
  }
  searcheBookList(data:any){
    console.log(data);
    this.searchEBookInputValues=data.value;
    this.searchSelectedCategory =data.category
  }

}
