import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideMapboxGL } from 'ngx-mapbox-gl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideHttpClient(),
    provideMapboxGL({
          accessToken: 'pk.eyJ1IjoibWFyY2Vsb2lnbGVzaWFzODIiLCJhIjoiY21leTN4ZGw2MDVmdjJqc2cxODg3Y3k1cCJ9.umw0y__7HAPW-vFyxy1N2Q'//Add token
    }),
    provideAuth0({
      domain: 'dev-gcxngey7xpwudoij.us.auth0.com',
      clientId: 'dw9JWdxh9AP0XiN5p4tBrbKOD2mJbNj4',
      authorizationParams: {
        redirect_uri: window.location.origin,
        prompt: 'login'
      }
    }),
  ]
};
