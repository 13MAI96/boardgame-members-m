// auth0-testing.module.ts
import { NgModule } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

@NgModule({
  providers: [
    {
      provide: AuthService,
      useValue: {
            isAuthenticated$: of(true),
            user$: of({ name: 'Test User'}),
            loginWithRedirect: () => {},
            logout: () => {}
      }
    }
  ]
})
export class Auth0TestingModule {}
