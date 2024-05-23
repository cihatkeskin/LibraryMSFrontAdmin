import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading:boolean = false;
  requesCount:number= 0

  constructor() { }
  setLoading(value:boolean){
    this.isLoading = value;
  }
  // addRequest(){
  //   this.requesCount ++;
  // }
  // removeRequest(){
  //   this.requesCount --;
  // }
}

