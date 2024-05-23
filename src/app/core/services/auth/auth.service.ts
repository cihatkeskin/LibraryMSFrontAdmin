import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService, MessageType, Position } from '../alertify/alertify.service';
import { CrudService } from '../crud/crud.service';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject = new BehaviorSubject<any>(null);
  


  constructor(
    private jwthelper:JwtHelperService,
    private route: Router,
    private alertify: AlertifyService,
    private crudservice:CrudService,
    private tokenService:TokenService
  ) { }
  public get isauthenticated(): boolean {
    return _isAuthenticated;
  }
  
  TokenCheck() {
    const token: any = localStorage.getItem('accessToken');
    let expired: boolean | Promise<boolean>;
    try {
      expired = this.jwthelper.isTokenExpired(token);
    } catch {
      expired = true;
    }
    _isAuthenticated = ((token != null) && (!expired));
  }
  public getAccessToken(): Observable<string | null> {
    return from(
      new Promise<string | null>(async (resolve) => {
          const accessToken = await this.tokenService.getToken();
          resolve(accessToken);
      })
    );
  }
  private revokeToken(): Observable<RevokeTokenResponse> {
    return this.crudservice.revokeToken<null,RevokeTokenResponse>({controller:'Auth',action:'RevokeToken'},null
    );
  }
  public refreshAccesstoken(): void {
    this.crudservice
      .get<RefreshTokenResponse>({controller:'Auth',action:'RefreshToken'})
      .subscribe((response) => {
        this.tokenService.setToken(response.token);
        console.log(response)
        this.refreshuserSubject();
      });
  }
  public refreshuserSubject(): void {
    this.getStaffFromAuth().subscribe({
      next: (staff) => {
        this.userSubject.next(staff);
      },
    });
  }
  public getStaffFromAuth(): Observable<LibraryResponse | null> {
    return this.getUserFromAuth().pipe(
      switchMap((user) => {
        if (user) {
          return this.crudservice.get<LibraryResponse>({controller:'LibraryStaffs',action:`${user.libraryStaffId}`});
        }
        return of(null);
      })
    );
  }

  public getUserFromAuth(): Observable<UserResponse | null> {
    return this.getAccessToken().pipe(
      switchMap((accessToken) => {
        if (!accessToken) {
          return of(null);
        }
        return this.crudservice.get<UserResponse>({controller:'Users',action:'GetFromAuth'});
      })
    );
  }
  logOut(){
    this.getAccessToken().subscribe((accessToken) => {
      if (accessToken) {
        this.revokeToken().subscribe(() => {
          console.log('Token revoked successfully');
          this.tokenService.removeToken();
          this.userSubject.next(null);
          this.route.navigateByUrl('/login');
        });
      } else {
        console.error('Access token not found');
      }
    });
  }


}
export let _isAuthenticated: boolean;
export interface RefreshTokenResponse {
	token: string;
	expirationDate: string;
}
export interface LibraryResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  imageUrl: string;
  subscribe: boolean;
}
export interface UserResponse {
	id: string;
	libraryStaffId: string;
	email: string;
}
export interface RevokeTokenResponse {
  id: string;
  token: string;
}
