import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../services/chat/chat.service';
import { NgIf } from '@angular/common';
import { LoginResponseBody } from '../../models/login';
import { LoginService } from '../../services/login/login.service';
import { GameService } from '../../services/game/game.service';

@Component({
    selector: 'app-actions',
    imports: [MatInputModule, MatIconModule, NgIf],
    templateUrl: './actions.component.html',
    styleUrl: './actions.component.scss'
})
export class ActionsComponent {
  public user!: LoginResponseBody

  constructor(
    private loginService: LoginService,
    private gameService: GameService
  ){
    this.loginService.user_obs.subscribe(
        (user: LoginResponseBody) => {
            this.user = user
        }
    )
  }

  public startGame(){
    this.gameService.startGame().subscribe(() => {
      console.log("Game started.")
    })
  }


}
