import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var $:any;
import Chart from 'chart.js/auto';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { IFeedBack } from '../../models/feedback';
import { CommonModule } from '@angular/common';
import { AuthService, LibraryResponse } from '../../../core/services/auth/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  feedbackList!:IFeedBack[];
  userInfo!:LibraryResponse;
  /**
   *
   */
  constructor(
    private crudservice:CrudService,
    private authService:AuthService

  ) {
    
  }


  ngOnInit(): void {
    this.Sidebar();
    this.getFeedBack();
    this.getUser();
  }

  Sidebar(){
    $('.sidebar-toggler').click(function () {
      $('.sidebar, .content').toggleClass("open");
      return false;
  });
  }

  getFeedBack(){
    this.crudservice.getList<IListRequest>({controller:"FeedBacks"},0,3).subscribe((data)=>{
      this.feedbackList =data.items;
  })
 } 

  feedback(){
    this.getFeedBack();
  }
  getUser(){
    this.authService.userSubject.subscribe((data:LibraryResponse)=>{
      this.userInfo = data
      console.log(data);
    })
  }

  logOut(){
    this.authService.logOut();
  }



}
