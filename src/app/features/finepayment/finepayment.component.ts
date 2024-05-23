import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPayment } from '../../shared/models/payment';
import { dataInfo } from '../../shared/directives/delete/delete.directive';
import { PaymentListConst } from '../../shared/constants/SearchTypeList';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../shared/directives/delete/delete.module';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from "../../shared/dialogs/payment/payment.component";
import { dataPagination, PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-finepayment',
    standalone: true,
    templateUrl: './finepayment.component.html',
    styleUrl: './finepayment.component.scss',
    imports: [CommonModule, DeleteModule, RouterModule, SearchComponent, FinepaymentComponent, PaymentComponent,PaginationComponent]
})
export class FinepaymentComponent implements OnInit{
  payment$ = new BehaviorSubject<IPayment[]>([]);
  controller:string="FineDues";
  dataInfo:dataInfo = {
    dataController:this.controller,
    list:this.payment$
  }
  paymentDataInfo:dataInfo = {
    dataController:this.controller,
    list:this.payment$
  }
  //pagination
  dataPagination:dataPagination={
    controller:this.controller,
    list:this.payment$
  };
  // search Ebook input values
  searchPaymentInputValues="";
  searchPaymentType= PaymentListConst;

  searchSelectedCategory:string='null';
  searchExist:boolean= false;
  searchPagination:boolean=true;
  /**
   *
   */
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
    private renderer: Renderer2,

  ) {
    
  }
  ngOnInit(): void {
    this.getListEBook();
  }

  getListEBook(){
    this.crudService.getList<IListRequest>({controller:this.controller},0,10).subscribe((data:IListRequest)=>{
      this.payment$.next(data.items);
    });
  }  

  searcheBookList(data:any){
    this.payment$.next(data);
  }
  paymentRecevied(id:string){
    this.openPaymentDialog();
    // this.crudService.delete<IListRequest>({controller:this.controller},id).subscribe((data:IListRequest)=>{
    //   this.payment$.next(data.items);
    // });
  }
  openPaymentDialog() { 
    //delete dialog
    const modelDiv = document.getElementById("paymentModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("payment");
      this.renderer.setAttribute(modelBody,'class',"modal fade show");
      this.renderer.setStyle(modelBody,'display',"block");
    } 
  } 
  ClosePaymentDialog() { 
    const modelDiv = document.getElementById("paymentModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("payment");
      this.renderer.setAttribute(modelBody,'class',"modal fade");
      this.renderer.setStyle(modelBody,'display',"none");
    } 
  } 
}
