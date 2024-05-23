import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { AlertifyService } from '../../../core/services/alertify/alertify.service';
import { BehaviorSubject, catchError } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{
  searchPageIndex:number= 0;

  
  countList!:number;
  public get searchhasPreviousList(): boolean {
    return searchhasPreviousList;
  }
  public get searchNextlist(): boolean {
    return searchNextlist;
  }
  search:boolean=false;
  @Input() data!:dataPagination;
  @Input() searchExist!:boolean;
  @Input() searchInputValues!:string;
  @Input() selectedSearchCategory!:string;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    const searchButton = document.getElementById('searchButton') as HTMLInputElement; 
    if ((clickedElement === searchButton)&&(this.searchInputValues !== null ) && (this.selectedSearchCategory !== 'null')) {
      console.log('Clicked on the search button');
      this.getSearchList();
      this.searchExist=true;
    }
    else if((this.searchInputValues === "" ) && (this.selectedSearchCategory  === "null")&&(this.searchExist == true)){
      this.searchExist=false;
      this.searchPageIndex=0;
      this.getList();
    }
  }
  @HostListener('document:change', ['$event'])
  onDocumentChange(event: Event){
    const target = event.target as HTMLElement;
    if ((target instanceof HTMLInputElement) && (target.id === this.data.controller)&& (this.selectedSearchCategory != 'null') ) {
      const inputValue = target.value;
      this.searchPageIndex=0;
    }
  }
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
  ) {
    
  }
  ngOnInit(): void {
    this.getList();
  }
  searchPrevious(){
    if(this.searchExist == false){
      this.searchPageIndex --;
      return this.getList();
    }
    else(this.searchExist == true)
    {
      this.searchPageIndex --;
      return this.getSearchList();
    }
  }
  searchNext(){
    if(this.searchExist == false){
    this.searchPageIndex ++;
      return this.getList();
    }
    else(this.searchExist == true)
    {
      this.searchPageIndex ++;
      return this.getSearchList();
    }

  }
  getList(){
    this.crudService.getList<IListRequest>({controller:this.data.controller},this.searchPageIndex ,10).subscribe((data:IListRequest)=>{
      this.data.list.next(data.items);
      searchhasPreviousList =data.hasPrevious;
      searchNextlist =data.hasNext;
      this.countList=data.count;
    });
  }
  getSearchList(){
    this.crudService.search<IListRequest>({controller:this.data.controller},
      this.searchPageIndex,10,this.selectedSearchCategory,this.searchInputValues)
    .subscribe((data)=>{
      this.data.list.next(data.items);
      searchhasPreviousList =data.hasPrevious;
      searchNextlist =data.hasNext;
      this.countList=data.count;
    });
  }


}
export let searchhasPreviousList: boolean = false;
export let searchNextlist: boolean = true;
export interface dataPagination {
  list:BehaviorSubject<any[]>,
  controller:string
}

