import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { BackendActionResponse } from './response.model';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const userService = inject(UserService);

  return from(auth.getAccessTokenSilently()).pipe(
    mergeMap((token: string) => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            user: `${userService.userData.value._id}`
          },
        });
        return next(authReq).pipe(
          tap(event => {
            if(event instanceof HttpResponse){
              const body: BackendActionResponse = event.body as BackendActionResponse;
              if(body?.action == 'incomplete_data'){
                router.navigate(['layout/user'])
              }
            }
          }) 
        );
      }
      return next(req);
    }),
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
                auth.logout({returnTo: window.location.origin} as LogoutOptions)
            }
            return throwError(() => error);
        })
  );
};
