import { Component, OnInit } from '@angular/core';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { ILocation } from '../../shared/models/location';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { BehaviorSubject } from 'rxjs';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent} from '../../shared/components/search/search.component';
import { LocationListConst } from '../../shared/constants/SearchTypeList';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,RouterModule,DeleteModule,PaginationComponent,SearchComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  locationList$ = new BehaviorSubject<ILocation[]>([]);
  controller:string ="Locations";
  action:string ="";

  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.locationList$
  };
  // search Location input values
  searchLocationInputValues="";
  searchLocationType= LocationListConst;
  dataInfo:dataInfo={
    dataController:this.controller,
    list:this.locationList$
  }
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
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
  async searchList(data:any){
    this.searchLocationInputValues=data.value;
    this.searchSelectedCategory =data.category
  }


}
