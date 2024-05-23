import { Component, OnInit } from '@angular/core';
import { ICatalog } from '../../shared/models/catalog';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { CatalogListConst } from '../../shared/constants/SearchTypeList';
import { SearchComponent } from '../../shared/components/search/search.component';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule,DeleteModule,RouterModule,SearchComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit{
  catalogList$ = new BehaviorSubject<ICatalog[]>([]);
  controller:string="Catalogs";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.catalogList$
  }
  // search Catalog input values
  searchCatalogInputValues="";
  searchCatalogType= CatalogListConst;
  /**
   *
   */
  constructor(
    private crudService:CrudService

  ) {
    
  }
  ngOnInit(): void {
    this.getListBook();
  }

  getListBook(){
    this.crudService.getList<IListRequest>({controller:this.controller},0,10).subscribe((data:IListRequest)=>{
      this.catalogList$.next(data.items) ;
    })
  }
  searcheBookList(data:any){
    this.catalogList$.next(data);
  }

}
