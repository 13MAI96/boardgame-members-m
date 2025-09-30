import { Injectable } from '@angular/core';
import { AuthService, User as AuthUser } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { FullUser, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.http_protocol + environment.api_url
    public userData: BehaviorSubject<FullUser>;
    public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.userData = new BehaviorSubject<FullUser>(new FullUser({}, {}))
    this.auth.user$.subscribe(x => {
      if(x){
        this.userData.next(this.userData.value?.updateFromAuth(x));
        this.getUserData()
      }
    })
  }

  private getUserData(){
    
    this.http.get<User>(`${this.apiUrl}/user?id=${this.userData.value.sub}`).subscribe( userApi => {
        this.userData.next(this.userData.value?.updateFromApi(userApi))
    })
  }

  public createUser(new_user: User){
    console.log(new_user)
    this.http.post<User>(`${this.apiUrl}/user`, new_user).subscribe(userApi => {
      this.userData.next(this.userData.value?.updateFromApi(userApi))
    })
  }

  public updateUser(new_user: User){
    this.http.put<User>(`${this.apiUrl}/user`, new_user).subscribe(userApi => {
      this.userData.next(this.userData.value?.updateFromApi(userApi))
    })
  }

  public getUsersList(){
    if(this.users.value.length == 0){
      this.http.get<User[]>(`${this.apiUrl}/user/list`).subscribe(usersApi => {
        this.users.next(usersApi)
      });
    }

  }
  
}
