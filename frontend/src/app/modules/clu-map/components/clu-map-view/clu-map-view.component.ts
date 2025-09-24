import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  PopupComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective
} from 'ngx-mapbox-gl'
import { UserModel, usersFake } from '../../models/user.model';

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
export class CluMapViewComponent implements AfterViewInit{
    users: UserModel[] = usersFake
    
    selected: UserModel | null = null;
    

  ngAfterViewInit(): void {
    
  }

  public openMarkerPopUp(marker: UserModel){
    this.selected = null
    setTimeout(() => {this.selected = marker}, 1)
    
  }

  public closeMarkerPopUp(){
    this.selected = null
  }

  
}

