import { Component, HostListener, Input } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { BehaviorSubject } from 'rxjs';
import { IPayment } from '../../models/payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  controller:string="FineDues"
  @Input() data!:PaymentData;
  @Input() memberName!:string;
  @Input() memberLastName!:string;
  @Input() finedueId!:string;


  /**
   *
   */
  constructor(
    private alertify: AlertifyService,
    private crudService:CrudService,
  ) {
    
  }
  
  onclick(){
    // const paymentButton = document.querySelector('.deleteButton');
    // paymentButton?.addEventListener('click',func=>{
    // });   
    this.delete(this.finedueId);
    this.close();
  }

  delete(Id:string){
    this.crudService.delete({
      controller:this.controller,
      action:this.finedueId
    },this.finedueId).subscribe(data =>{
      this.alertify.message('Success Paid', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.updateList();
    });  
  }
  updateList(){
    this.crudService.getList<IListRequest>({
      controller:this.controller
    },0,10).subscribe(data =>{
      this.data.list.next(data.items);
    }); 
  }


  close() { 
    const modelDiv = document.getElementById("paymentModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("payment");
      modelBody?.setAttribute('class',"modal fade");
      modelBody?.setAttribute('style',"display:none");
    } 
  } 
}
export interface PaymentData{
  dataController:string,
  list:BehaviorSubject<any[]>
}
