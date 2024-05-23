import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IMagazine } from '../../shared/models/allMaterials';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MagazineListConst } from '../../shared/constants/SearchTypeList';

@Component({
  selector: 'app-magazine',
  standalone: true,
  imports: [HttpClientModule,CommonModule,DeleteModule,RouterModule,SearchComponent,PaginationComponent],
  templateUrl: './magazine.component.html',
  styleUrl: './magazine.component.scss'
})
export class MagazineComponent implements OnInit{
  magazineList$ = new BehaviorSubject<IMagazine[]>([]);
  controller:string="Magazines";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.magazineList$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.magazineList$
  };
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  // search Magazine input values
  searchMagazineInputValues="";
  searchMagazineType= MagazineListConst;
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
  searchList(data:any){
    console.log(data);
    this.searchMagazineInputValues=data.value;
    this.searchSelectedCategory =data.category
  }
}
