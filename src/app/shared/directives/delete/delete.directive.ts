import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, output, Renderer2 } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';
import { CrudService, IListRequest } from '../../../core/services/crud/crud.service';
import { _isClickEvent } from 'chart.js/dist/helpers/helpers.core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDelete]',
  standalone: true
})
export class DeleteDirective {
  svgClass:string='bi bi-trash-fill';
  path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg = document.createElementNS('http://www.w3.org/2000/svg','svg');

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private alertify: AlertifyService,
    private crudService:CrudService,
    private route:Router
  ) {
    this.renderer.setAttribute(this.svg,'xmlns','http://www.w3.org/2000/svg')
    this.renderer.setAttribute(this.svg,'class','bi bi-trash-fill')
    this.renderer.setAttribute(this.svg,'viewBox','0 0 16 16')
    this.renderer.setAttribute(this.svg,'fill','currentColor')
    this.renderer.setAttribute(this.svg,'width','16')
    this.renderer.setAttribute(this.svg,'height','16')
    this.renderer.appendChild(this.svg, this.path);
    this.renderer.setAttribute(this.path,'d','M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0')
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
    this.renderer.appendChild(this.element.nativeElement, this.svg);
  }
  @Input() data!:dataInfo;
  @Input() id!:string;
  @Input() dataAction!:string;
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.svg, 'color', 'red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.svg, 'color' );
  }


  @HostListener("click")

  onclick(){
    this.openDeleteDialog();
    const deleteButton = document.querySelector('.deleteButton');
    //when active delete button
    deleteButton?.addEventListener('click',func=>{
      this.CloseDeleteDialog();
      this.delete();
    });   
  }
  delete(){
    //Delete 
    this.crudService.delete({
      controller:this.data.dataController,
      action:this.dataAction
    },this.id).subscribe(data =>{
      this.alertify.message('Success Deleted', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
      this.updateList();
    });     
  }
  updateList(){
    this.crudService.getList<IListRequest>({
      controller:this.data.dataController
    },0,10).subscribe(data =>{
      this.data.list.next(data.items);
    }); 
  }
  openDeleteDialog() { 
    //delete dialog
    const modelDiv = document.getElementById("deleteModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("exampleModal");
      this.renderer.setAttribute(modelBody,'class',"modal fade show");
      this.renderer.setStyle(modelBody,'display',"block");
    } 
  } 
  CloseDeleteDialog() { 
    const modelDiv = document.getElementById("deleteModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("exampleModal");
      this.renderer.setAttribute(modelBody,'class',"modal fade");
      this.renderer.setStyle(modelBody,'display',"none");
    } 
  } 
}

export interface dataInfo{
  dataController:string,
  list:BehaviorSubject<any[]>
}