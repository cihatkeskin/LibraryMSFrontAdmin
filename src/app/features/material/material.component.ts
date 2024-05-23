import { Component, OnInit } from '@angular/core';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { BehaviorSubject } from 'rxjs';
import { IMaterial } from '../../shared/models/allMaterials';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MaterialListConst } from '../../shared/constants/SearchTypeList';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [HttpClientModule,CommonModule,DeleteModule,RouterModule,SearchComponent,PaginationComponent],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent implements OnInit{
  materialList$ = new BehaviorSubject<IMaterial[]>([]);
  controller:string="Materials";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.materialList$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.materialList$
  };
  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  // search Ebook input values
  searchMaterialInputValues="";
  searchMaterialType= MaterialListConst;
  
  /**
   *
   */
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService
  ) {
    
  }
  ngOnInit(): void {
    this.getListMaterial();
  }
  getListMaterial(){
    this.crudService.getList<IListRequest>({controller:this.controller},0,10).subscribe((data:IListRequest)=>{
      this.materialList$.next(data.items);
    });
  } 
  searchList(data:any){
    this.materialList$.next(data);
  }

}
