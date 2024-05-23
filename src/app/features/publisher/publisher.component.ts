import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IPublisher } from '../../shared/models/publisher';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { BehaviorSubject } from 'rxjs';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { publisherListConst } from '../../shared/constants/SearchTypeList';

@Component({
  selector: 'app-publisher',
  standalone: true,
  imports: [HttpClientModule,CommonModule,DeleteModule,RouterModule,PaginationComponent,SearchComponent],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.scss'
})
export class PublisherComponent implements OnInit{
  publisherList$ = new BehaviorSubject<IPublisher[]>([]);
  controller:string="Publishers";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.publisherList$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.publisherList$
  };
  // search Publisher input values
  searchPublisherInputValues="";
  searchPublisherType= publisherListConst;
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
    this.searchPublisherInputValues=data.value;
    this.searchSelectedCategory =data.category
  }

}
