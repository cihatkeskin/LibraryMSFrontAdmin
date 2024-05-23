import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token:string){
    localStorage.setItem('accessToken',token);
  }
  getToken(){
    return localStorage.getItem('accessToken');
  }
  removeToken(){
    return localStorage.removeItem('accessToken');
  }
}
