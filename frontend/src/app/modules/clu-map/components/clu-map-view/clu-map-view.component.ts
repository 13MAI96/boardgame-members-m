import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  PopupComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective,
  GeoJSONSourceComponent,
  LayerComponent,
  MarkersForClustersComponent
} from 'ngx-mapbox-gl';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { CircleLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl';
import { COLORS } from '../../../../utils/colors.enum';
import { ClusterPointComponent } from '../../../../components/cluster/map-cluster.component';
import { BehaviorSubject } from 'rxjs';
import { GeoJsonProperties } from 'geojson';


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
    MarkersForClustersComponent,
    ClusterPointComponent,
],
  templateUrl: './clu-map-view.component.html',
  styleUrl: './clu-map-view.component.scss'
})
export class CluMapViewComponent{
  location: BehaviorSubject<GeoJSON.FeatureCollection<GeoJSON.Point> | null> = new BehaviorSubject<GeoJSON.FeatureCollection<GeoJSON.Point> | null>(
    null
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clusterProperties: any;
  circlePaint: CircleLayerSpecification['paint'];
  labelLayout: SymbolLayerSpecification['layout'] = {
  'text-field': ['get', 'role'],
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-size': 10,
};
  labelPaint: SymbolLayerSpecification['paint'] = {
  'text-color': [
    'case',
    ['==', ['get', 'role'], 'Player'], COLORS[0],
    ['==', ['get', 'role'], 'Influencer'], COLORS[1],
    ['==', ['get', 'role'], 'Shop'], COLORS[2],
    ['==', ['get', 'role'], 'Cafe'], COLORS[3],
    '#000000' // default
  ],
};



    public selected: User | null = null;
    public loading: boolean = false;
    
    constructor(
      public userService: UserService
    ){

      const isPlayer = ['==', ['get', 'role'], 'Player'];
      const isInfluencer = ['==', ['get', 'role'], 'Influencer'];
      const isShop = ['==', ['get', 'role'], 'Shop'];
      const isCafe = ['==', ['get', 'role'], 'Cafe'];

    this.clusterProperties = {
      player: ['+', ['case', isPlayer, 1, 0]],
      influencer: ['+', ['case', isInfluencer, 1, 0]],
      shop: ['+', ['case', isShop, 1, 0]],
      cafe: ['+', ['case', isCafe, 1, 0]],
    };

    this.circlePaint = {
  'circle-color': [
    'case',
    ['==', ['get', 'role'], 'Player'], COLORS[0],
    ['==', ['get', 'role'], 'Influencer'], COLORS[1],
    ['==', ['get', 'role'], 'Shop'], COLORS[2],
    ['==', ['get', 'role'], 'Cafe'], COLORS[3],
    '#cccccc' // color default
  ],
  'circle-opacity': 0.6,
  'circle-radius': 12,
};

      userService.userData.subscribe(x => {
        if(x._id){
          this.userService.getUsersList()
        } else {

        }
      })
      userService.users.subscribe(list => {
        const newLocations: GeoJSON.Feature<GeoJSON.Point, { name: string; id: string; role: string }>[] = list.map(x => {
          return { 
            type:'Feature',
              geometry: {
                type: 'Point', 
                coordinates: [x.lng ?? 0, x.lat ?? 0]
              },
              properties: {
                name: x.name ?? '',
                id: x._id ?? '',
                role: x.role ?? 'Player'
              }}
          
        })
        const newObject: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties> = {
          type: 'FeatureCollection',
          features: newLocations,
        }
        if(list.length > 0)  {
          this.location.next(newObject)
          console.log(newObject)
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


