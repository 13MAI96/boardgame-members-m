import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ChatMessage, Player } from '../../models/message'
import { getCookie } from '../../utils/cookie';
import { Environment } from '../../../environment/dev.environment';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: WebSocket;
  private history: ChatMessage[] = []
  private voidPlayer: Player[] = [] 
  public players: BehaviorSubject<Player[]> = new BehaviorSubject(this.voidPlayer);
  public messages: BehaviorSubject<ChatMessage[]> = new BehaviorSubject(this.history)
  private interval!: number

  constructor(
    private loginService: LoginService,
    private gameService: GameService,
    private router: Router
  ) {
    setTimeout(() => {
      this.startSocket()
    }, 1000)
    
   }

   startSocket(){
    this.socket = new WebSocket(`${Environment.ws_protocol}${Environment.api_url}/feed/ws/${this.loginService.token}`);
    this.interval = window.setInterval(()=>{
      if(this.socket.CLOSED){
        this.forceClose()
      }
    }, 2000)
    this.socket.onopen = (ev: Event) => {
      console.log("Socket opened.")
    };
    this.socket.onclose = () => {
      this.forceClose()
    }
    this.socket.onmessage = (message: MessageEvent) => {
      let temp = this.messages.value
      let newMessage: ChatMessage = JSON.parse(message.data)
      if(newMessage.type == 'message' || newMessage.type == 'notify'){
        temp.push(newMessage)
        this.messages.next(temp)
      } else if(newMessage.type == 'command'){
        if(newMessage.command == 'assignRole'){
          let updatedUser = this.loginService.user;
          updatedUser.role = newMessage.text;
          this.loginService.user = updatedUser;
          this.messages.next([])
        } else if(newMessage.command == 'updateMap'){
          this.gameService.getMap()
        }
      } else if(newMessage.type = 'data'){
        console.log("Data")
        this.players.next(newMessage.data)
      } else {
        console.log(newMessage)
      }
    }
   }

   sendMessage(message: ChatMessage){
    message.sender = this.loginService.user.username
    this.socket.send(JSON.stringify(message))
   }

   forceClose(){
    clearInterval(this.interval)
    console.log("Socket closed.")
    this.players.next([])
    this.router.navigate(["login"])
   }
}
