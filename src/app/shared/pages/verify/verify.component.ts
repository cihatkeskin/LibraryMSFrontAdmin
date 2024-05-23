import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { CommonModule } from '@angular/common';
import { catchError, pipe, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../../core/services/alertify/alertify.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  providers:[]
})
export class VerifyComponent implements OnInit{
  success:boolean =false;
  fault:boolean =false;
  
  /**
   *
   */
  constructor(
    private activatedRoute:ActivatedRoute,
    private crudservise:CrudService,
    private alertify:AlertifyService

  ) {
    
  }


  ngOnInit(): void {
    
    // console.log(this.activatedRoute.pathFromRoot);
    this.activatedRoute.queryParamMap.subscribe(data=>{
      const queryObject:string = data.keys[0];
      queryObject?.replace(' ','+');
      const queryObjectValue:string =data.get(data.keys[0]) as string ;
      const queryString:string = `${queryObject}${queryObjectValue?.replace(' ','+').slice(0,queryObjectValue.length-6)}=`;
      const query:string= queryString.replace(' ','');
      console.log(data)
      console.log(queryObject)
      console.log(query)



      
      // const queryString:string = `${queryObject}${queryObjectValue}`

      this.crudservise.get({
        fullEndPoint:`//localhost:60805/api/Auth/VerifyEmailAuthenticator?ActivationKey=${query}`,

      }).pipe(catchError((err:HttpErrorResponse)=>{
        return throwError(() => {
          this.fault =true;
          this.alertify.message(err.error.title, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
        });
      }))
      .subscribe(data =>{
        this.success=true;
        console.log('başarili');
      })
    });
  }

}
