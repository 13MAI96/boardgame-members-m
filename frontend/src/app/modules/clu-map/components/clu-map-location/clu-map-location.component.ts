import { Component, AfterViewInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective
} from 'ngx-mapbox-gl';
import { MapMouseEvent } from 'mapbox-gl';
import { AuthService, User as AuthUser } from '@auth0/auth0-angular';
import { FullUser, User } from '../../../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-clu-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    GeolocateControlDirective,
    ControlComponent,
    MarkerComponent
  ],
  templateUrl: './clu-map-location.component.html',
  styleUrl: './clu-map-location.component.scss'
})
export class CluMapLocationComponent{
  private user!: FullUser;
  public roleOptions: string[] = ["Player", "Shop", "Cafe", "Influencer"]

  public form!: FormGroup;
  constructor(
    public userService: UserService
  ){
    this.form = new FormGroup({
      _id: new FormControl(''),
      sub: new FormControl(''),
      email: new FormControl({value: '', disabled: true}),
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      telegram_user: new FormControl('', Validators.required),
      lng: new FormControl('', [Validators.required, Validators.min(-200), Validators.max(200)]),
      lat: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)])
    })
    this.userService.userData.subscribe(x =>{
      console.log(x)
      this.user = x ;
      this.form.controls['_id'].setValue(x._id);
      this.form.controls['sub'].setValue(x.sub);
      this.form.controls['email'].setValue(x.email);
      this.form.controls['name'].setValue(x.name);
      this.form.controls['role'].setValue(x.role);
      this.form.controls['telegram_user'].setValue(x.telegram_user);
      this.form.controls['lng'].setValue(x.lng);
      this.form.controls['lat'].setValue(x.lat);
    })
    
  }

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
      this.coordinates.set(e.lngLat.toArray())
      this.form.controls['lng'].setValue(e.lngLat.lng);
      this.form.controls['lat'].setValue(e.lngLat.lat);
    }

  public getStyleString(userPicture: string | undefined): string{
    const styleString = `background-image: url(${userPicture});`
    return styleString;
  }

  public updateUser(){
    if(this.form.invalid) return
    if(this.user._id && this.user._id.length > 1){
      this.userService.updateUser(this.form.getRawValue())
    } else {
      this.userService.createUser(this.form.getRawValue())
    }
  }
  
}

