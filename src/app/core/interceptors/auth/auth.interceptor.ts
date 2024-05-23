import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService)
  let newRequest = req.clone(
    {setHeaders:{Authorization:`Bearer ${tokenService.getToken()}`},withCredentials:true}
    );
    // if (typeof document !== 'undefined') {

    //   let newRequest = req.clone(
    //     {setHeaders:{Authorization:`Bearer ${tokenService.getToken()}`},withCredentials:true}
    //     );
    //   return next(newRequest);
    // }

  return next(newRequest).pipe(
    catchError((error:HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log('Unauthorized, refreshing token...');
        authService.refreshAccesstoken();
      }
      return throwError(() => error);
    })
  );
};
