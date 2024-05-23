import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IReservation } from '../../../shared/models/reservation';
import { dataPagination, PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AlertifyService } from '../../../core/services/alertify/alertify.service';
import { CrudService } from '../../../core/services/crud/crud.service';
import { DeleteModule } from '../../../shared/directives/delete/delete.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-reservation',
  standalone: true,
  imports: [CommonModule,RouterModule,DeleteModule,PaginationComponent],
  templateUrl: './book-reservation.component.html',
  styleUrl: './book-reservation.component.scss'
})
export class BookReservationComponent implements OnInit{
  reservationList$ = new BehaviorSubject<IReservation[]>([]);
  controller:string ="BookReservations";
  action:string ="";
  searchSelectedCategory:string='null';
  searchReservationInputValues="";

  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.reservationList$
  };

  searchExist:boolean= false;
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
  searchList(data:any){

  }

}
