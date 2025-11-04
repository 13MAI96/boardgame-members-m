import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  PopupComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective,
  GeoJSONSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { BehaviorSubject } from 'rxjs';

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
    GeolocateControlDirective,
    GeoJSONSourceComponent,
    LayerComponent,
],
  templateUrl: './clu-map-view.component.html',
  styleUrl: './clu-map-view.component.scss'
})
export class CluMapViewComponent{
  @ViewChild(MapComponent) map!: MapComponent;

    public selected: User | null = null;
    public users_location: BehaviorSubject<GeoJSON.FeatureCollection<GeoJSON.Point, { role: string, name: string }> | null> = new BehaviorSubject< GeoJSON.FeatureCollection<GeoJSON.Point, { role: string, name: string }> | null>(null) 
    public showMarkers = false;
    
    constructor(
      public userService: UserService
    ){
      userService.userData.subscribe(x => {
        if(x._id){
          this.userService.getUsersList()
        } else {

        }
      })
      userService.users.subscribe(x => {
        const features: GeoJSON.Feature<GeoJSON.Point, { role: string, name: string }>[] = x.map( user => {
          return {
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [user.lng ?? 0, user.lat ?? 0]},
            properties: { role: user.role ?? 'Player', name: user.name ?? '' }
          }
        })
        this.users_location.next({type: 'FeatureCollection', features})
      })
    }


  public openMarkerPopUp(marker: User){
    this.selected = null
    setTimeout(() => {this.selected = marker}, 1)
  }

  public closeMarkerPopUp(){
    this.selected = null
  }

  onZoomChange() {
    const zoom = this.map.mapInstance?.getZoom();
      if (zoom !== undefined) {
        this.showMarkers = zoom > 13;
      }
  }
}

