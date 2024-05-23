import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFeedBack } from '../../shared/models/feedback';
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule,RouterModule,DeleteModule,PaginationComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit{
  feedBackList$ = new BehaviorSubject<IFeedBack[]>([]);
  controller:string ="FeedBacks";
  action:string ="";
  searchSelectedCategory:string='null';
  searchFeedBackInputValues="";

  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.feedBackList$
  };

  searchExist:boolean= false;
  /**
   *
   */
  constructor(
  ) {
    
  }

  ngOnInit(): void {
  }
  searchList(data:any){
  }

}
