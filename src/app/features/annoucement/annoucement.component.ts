import { Component, NgModule, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAnnoucement } from '../../shared/models/annoucement';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { EBookListConst } from '../../shared/constants/SearchTypeList';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-annoucement',
  standalone: true,
  imports: [CommonModule,DeleteModule,RouterModule,SearchComponent,PaginationComponent],
  templateUrl: './annoucement.component.html',
  styleUrl: './annoucement.component.scss'
})
export class AnnoucementComponent implements OnInit{
  announcementList$ = new BehaviorSubject<IAnnoucement[]>([]);
  controller:string="Announcements";
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.announcementList$
  };
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.announcementList$
  }

  searchExist:boolean= false;
  searchSelectedCategory:string='null';
  searchAnnouncementInputValues="";
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
    private render:Renderer2
  ) {
    
  }
  ngOnInit(): void {
  }


}