import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { IBook } from '../../../shared/models/book';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { ICatalog } from '../../../shared/models/catalog';
import { IEBook, IMagazine, IMaterial } from '../../../shared/models/allMaterials';

@Component({
  selector: 'app-catalog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-details.component.html',
  styleUrl: './catalog-details.component.scss'
})
export class CatalogDetailsComponent implements OnInit{
  catalogId!:string;
  catalog!:ICatalog;
  books!:IBook[];
  ebooks!:IEBook[];
  magazines!:IMagazine[];
  materials!:IMaterial[];
  controller ="Catalogs";


  constructor(
    private route: ActivatedRoute,
    private crud:CrudService,
    private render:Renderer2
  ) { 
  }
  ngOnInit(): void {
    this.getParamsId();

    this.getBook();

  }

  getParamsId():string{
    let id:string="";
    this.route.params.subscribe(params=>{
        id = params['id'];
    });
    return id;
  }

  getBook(){
    this.catalogId  = this.getParamsId();
    this.crud.get<ICatalog>({
      controller:this.controller
    },this.catalogId).subscribe((data:ICatalog)=>{
      this.catalog = data;
      this.books = data.books;
      this.magazines = data.magazines;
      this.ebooks = data.eBooks;
      this.materials = data.materials;
    })
  }
  accordionCollapse(event:any,id:string){
    const elm:HTMLButtonElement = event.target
    const elmClass:any =elm.getAttribute('class'); 
    const body:any = document.getElementById(id);

    if(elmClass == 'accordion-button')
      {
        this.render.setAttribute(elm,'class','accordion-button collapsed')
        this.render.setAttribute(elm,'aria-expended','false')
        this.render.setAttribute(body,'class','accordion-collapse collapse')
      }
      else if(elmClass == 'accordion-button collapsed'){
        this.render.setAttribute(elm,'class','accordion-button')
        this.render.setAttribute(elm,'aria-expended','true')
        this.render.setAttribute(body,'class','accordion-collapse collapse show')
      }
  }
}
