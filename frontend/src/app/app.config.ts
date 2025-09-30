import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideMapboxGL } from 'ngx-mapbox-gl';
import { authInterceptor } from './interceptors/auth.interceptors';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideHttpClient(),
    provideMapboxGL({
          accessToken: 'pk.eyJ1IjoibWFyY2Vsb2lnbGVzaWFzODIiLCJhIjoiY21leTN4ZGw2MDVmdjJqc2cxODg3Y3k1cCJ9.umw0y__7HAPW-vFyxy1N2Q'//Add token
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth0({
      domain: environment.auth_domain,
      clientId: environment.auth_client_id,
      authorizationParams: {
        audience: environment.auth_audience,
        redirect_uri: window.location.origin,
        prompt: 'login'
      }
    }),
  ]
};
