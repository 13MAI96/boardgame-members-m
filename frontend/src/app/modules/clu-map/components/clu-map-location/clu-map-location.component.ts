import { Component, AfterViewInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective
} from 'ngx-mapbox-gl'
import { UserModel, usersFake } from '../../models/user.model';
import { MapMouseEvent } from 'mapbox-gl';
import { LocationModel } from '../../models/location.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-clu-map',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    GeolocateControlDirective,
    ControlComponent,
    MarkerComponent,
    AsyncPipe
],
  templateUrl: './clu-map-location.component.html',
  styleUrl: './clu-map-location.component.scss'
})
export class CluMapLocationComponent implements AfterViewInit{

  constructor(
    public auth: AuthService
  ){}

    userLocation: UserModel = new UserModel('Marcelo', 'Iglesias', new LocationModel(0, 0), '@T13MAI96')
    zoom = 12;


    coordinates = signal<[number, number]>([0, 0]);
    layerPaint = signal({
      'circle-radius': 10,
      'circle-color': '#3887be',
    });


    changeColor(color: string) {
      this.layerPaint.set({ ...this.layerPaint(), 'circle-color': color });
    }

    setLocation(e: MapMouseEvent){
      console.log(e)
      this.coordinates.set(e.lngLat.toArray())
      this.userLocation.location = new LocationModel(e.lngLat.lng, e.lngLat.lat)
    }

  ngAfterViewInit(): void {
    
  }


  
}

