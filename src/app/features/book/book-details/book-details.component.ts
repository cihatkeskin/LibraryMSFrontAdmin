import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { IBook } from '../../../shared/models/book';
import { CommonModule } from '@angular/common';
import { IAuthor } from '../../../shared/models/author';
declare var $:any;


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit{
  bookId!:string;
  book!:IBook;
  authors!:IAuthor[];



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
    this.bookId  = this.getParamsId();
    this.crud.get<IBook>({
      controller:"Books"
    },this.bookId).subscribe((data:IBook)=>{
      this.book =data;
      this.authors=data.authors;
      console.log(this.book);
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
