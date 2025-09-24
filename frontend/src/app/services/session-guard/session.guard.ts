// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard{

    constructor(
        private authService: LoginService, 
        private router: Router
    ) { }


  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isSessionValid().pipe(
      map(isValid => isValid || this.router.createUrlTree(['/login']))
    );
  }

  canMatch(): Observable<boolean | UrlTree> {
    return this.canActivate();
  }
}
