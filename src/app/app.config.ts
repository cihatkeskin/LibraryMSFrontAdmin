import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
            tokenGetter: ()=> sessionStorage.getItem('token'),
            allowedDomains: ["localhost:60805"]
            // disallowedRoutes: ["http://example.com/examplebadroute/"],
        },
    }),
    ),
    provideHttpClient(withInterceptors([authInterceptor,loadingInterceptor])),
  ]
};
