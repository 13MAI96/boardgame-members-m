import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FullUser, User } from '../../models/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.http_protocol + environment.api_url
    public userData$: BehaviorSubject<FullUser>;
    public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
    private auth: AuthService = inject(AuthService)
    private http: HttpClient = inject(HttpClient)

  constructor() {
    this.userData$ = new BehaviorSubject<FullUser>(new FullUser({}, {}))
    this.auth.user$.subscribe(x => {
      if(x){
        this.userData$.next(this.userData$.value?.updateFromAuth(x));
        this.getUserData()
      }
    })
  }

  private getUserData(): Subscription{
    return this.http.get<User>(`${this.apiUrl}/user?id=${this.userData$.value.sub}`).subscribe( userApi => {
        this.userData$.next(this.userData$.value?.updateFromApi(userApi))
        return userApi
    })
  }

  public createUser(token: string, new_user: User): Subscription{
    return this.http.post<User>(`${this.apiUrl}/user?token=${token}`, new_user).subscribe(userApi => {
      this.userData$.next(this.userData$.value?.updateFromApi(userApi))
    })
  }

  public updateUser(new_user: User): Subscription{
    return this.http.put<User>(`${this.apiUrl}/user`, new_user).subscribe(userApi => {
      this.userData$.next(this.userData$.value?.updateFromApi(userApi))
    })
  }

  public getUsersList(): Subscription | undefined{
    if(this.users$.value.length == 0){
      return this.http.get<User[]>(`${this.apiUrl}/user/list`).subscribe(usersApi => {
        this.users$.next(usersApi)
      });
    }
    return
  }
  
}
