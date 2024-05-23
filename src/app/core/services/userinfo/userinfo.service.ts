import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { emailAuthReq } from '../../../shared/models/authReq';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor() { }
  private user$: BehaviorSubject<emailAuthReq> = new BehaviorSubject<emailAuthReq>({email:"",password:""});

  public getData(): Observable<emailAuthReq> { 
    return this.user$.asObservable();
  } 
  public setData(data: emailAuthReq): void { 
    this.user$.next(data);
  }
}
