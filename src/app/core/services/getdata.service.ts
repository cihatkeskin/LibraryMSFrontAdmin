import { Injectable } from '@angular/core';
import { CrudService } from './crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(
    private crud:CrudService
  ) { }
  getById(id:string,controller:string,List:any){
    this.crud.get<any>({
      controller:controller
    },id).subscribe((x:any)=>{
      List =x;
    });
    return List;
  }
}
