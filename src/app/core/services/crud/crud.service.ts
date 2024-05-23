import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,  Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private httpClient: HttpClient

  ) { }

  private baseUrl:string =environment.apiUrl;

  private url(requestParamater:Partial<RequestParamaters>){
    return `${requestParamater.baseUrl ? requestParamater.baseUrl: this.baseUrl}/${requestParamater.controller}${requestParamater.action ? 
      `/${requestParamater.action}` : ""}`
  }

  get<T>(requestParamater:Partial<RequestParamaters>,id?:String) :Observable<T> {
    let url:string ="";
    if(requestParamater.fullEndPoint)
       url =requestParamater.fullEndPoint;
    else
      url = `${this.url(requestParamater)}${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url,{headers :requestParamater.headers})
  }
  getList<IListRequest>(requestParamater:Partial<RequestParamaters>,PageIndex:number,PageSize:number){
    let url:string ="";
    if(requestParamater.fullEndPoint)
       url =requestParamater.fullEndPoint;
    else
      url = `${this.url(requestParamater)}${"?PageIndex="+PageIndex+"&PageSize="+PageSize}`;
    return this.httpClient.get<IListRequest>(url,{headers :requestParamater.headers})
  }
  search<IListRequest>(requestParamater:Partial<RequestParamaters>,
    PageIndex:number,PageSize:number,category:string,categoryValue:any){
    let url:string ="";
    if(requestParamater.fullEndPoint)
       url =requestParamater.fullEndPoint;
    else
      url = `${this.url(requestParamater)}${"/search?"+category+"="+categoryValue+"&PageIndex="+PageIndex+"&PageSize="+PageSize}`;
    return this.httpClient.get<IListRequest>(url,{headers :requestParamater.headers})
  }
  post<T>(requestParamater:Partial<RequestParamaters>, body : Partial<T>){
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}` ;
    
    return this.httpClient.post<T>(url,body,{headers:requestParamater.headers}).pipe
    (catchError((err:HttpErrorResponse):Observable<any>=>{
      console.log(err.error);
      return throwError(()=>{err})
    }));
  }

  put<T>(requestParamater:Partial<RequestParamaters>, body : Partial<T>) :Observable<T> {
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.put<T>(url,body,{headers:requestParamater.headers});
  }
  delete<T>(requestParamater:Partial<RequestParamaters>, id:string):Observable<T> {
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.delete<T>(url,{headers:requestParamater.headers});
  }
  addImage<T>(requestParamater:Partial<RequestParamaters>,body:FormData){
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.post<T>(url,body);
  }
  updateImage<T>(requestParamater:Partial<RequestParamaters>,body:FormData){
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.put<T>(url,body);
  }
  getStatistics<T>(requestParamater:Partial<RequestParamaters>){
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.get<T>(url);
  }
  revokeToken<T,U>(requestParamater:Partial<RequestParamaters>, body : T) :Observable<U> {
    let url:string ="";
    if(requestParamater.fullEndPoint)
    url =requestParamater.fullEndPoint;
    else
    url = `${this.url(requestParamater)}`;
    return this.httpClient.put<U>(url,body,{headers:requestParamater.headers});
  }
}
export class RequestParamaters{
  baseUrl?:string;
  controller?:string;
  action?:string;
  headers?:HttpHeaders;
  fullEndPoint?:string
}

export interface IListRequest{
  items:any[],
  index:number,
  size:number,
  count:number,
  pages:number,
  hasPrevious:boolean,
  hasNext:boolean
}
