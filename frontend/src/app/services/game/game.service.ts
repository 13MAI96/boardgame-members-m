import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BodyResponse, DefaultResponse } from '../../models/login';
import { Environment } from '../../../environment/dev.environment';
import { LoginService } from '../login/login.service';
import { Map } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private backendUrl: string = `${Environment.http_protocol}${Environment.api_url}` //"http://172.20.10.4:4600/login"//'http://localhost:4600/login'; 
  public game_map: BehaviorSubject<Map>

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.game_map = new BehaviorSubject(new Map())
  } 

  public startGame(): Observable<DefaultResponse> {
    const header = new HttpHeaders({session: this.loginService.token})
    return this.http.put<DefaultResponse>(`${this.backendUrl}/feed/start`, null, {headers: header});
  }

  public getMap(){
    return this.http.get<BodyResponse<Map>>(`${this.backendUrl}/feed/map`, {headers: new HttpHeaders({session: this.loginService.token})}).pipe(
        map((response: BodyResponse<Map>)=>{
            this.game_map.next(response.body)
            return response
        })
    ).subscribe();
  }

}
