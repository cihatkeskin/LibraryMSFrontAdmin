import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {


  close() { 
    const modelDiv = document.getElementById("deleteModel");
    if(modelDiv != null){
      const modelBody = document.getElementById("exampleModal");
      modelBody?.setAttribute('class',"modal fade");
      modelBody?.setAttribute('style',"display:none");
    } 
  } 
}
