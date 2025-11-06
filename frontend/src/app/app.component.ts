import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { GoogleTagManagerModule } from 'angular-google-tag-manager';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    
})
export class AppComponent{
  title = 'Boardgame Members';
  
}
