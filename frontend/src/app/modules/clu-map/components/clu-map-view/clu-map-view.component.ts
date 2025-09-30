import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  PopupComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective
} from 'ngx-mapbox-gl';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-clu-map',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    MarkerComponent,
    PopupComponent,
    ControlComponent,
    NavigationControlDirective,
    GeolocateControlDirective
],
  templateUrl: './clu-map-view.component.html',
  styleUrl: './clu-map-view.component.scss'
})
export class CluMapViewComponent{

    public selected: User | null = null;
    public loading: boolean = false;
    
    constructor(
      public userService: UserService
    ){
      userService.userData.subscribe(x => {
        if(x._id){
          this.userService.getUsersList()
        } else {

        }
      })
    }


  public openMarkerPopUp(marker: User){
    this.selected = null
    setTimeout(() => {this.selected = marker}, 1)
    
  }

  public closeMarkerPopUp(){
    this.selected = null
  }

  public getStyleString(userPicture: string | undefined): string{
    const styleString = `background-image: url(${userPicture});`
    return styleString;
  }

  public getUserAlert(){
    const user = this.userService.userData.value;
    const ahora: Date = new Date();
    if(user.updatedAt){
      const diffMs: number = ahora.getTime() - new Date(user.updatedAt).getTime();
      const diffHoras = diffMs / (1000 * 60 * 60);
      if(diffHoras < 12){
        return "Podras ver la ubicacion de otros usuarios despues de 12hs de la ultima actualizacion de perfil."
      } else {
        return ""
      }
    }

    return ""
  }
  
}

