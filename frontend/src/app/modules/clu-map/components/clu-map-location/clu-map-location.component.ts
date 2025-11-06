import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent,
  MarkerComponent,
  ControlComponent,
  NavigationControlDirective,
  GeolocateControlDirective
} from 'ngx-mapbox-gl';
import { MapMouseEvent } from 'mapbox-gl';
import { FullUser } from '../../../../models/user/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private user!: FullUser;
  public roleOptions: string[] = ["Player", "Shop", "Cafe", "Influencer"]
  public first_update_token: string | undefined

  public form!: FormGroup;
  public zoom = 12;
  public userService: UserService = inject(UserService)


  constructor(){
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
    this.userService.userData$.subscribe(x =>{
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
    this.route.queryParams.subscribe(params => {
      this.first_update_token = params['token'];
      if(!this.first_update_token) this.form.controls['role'].disable()
    });
  }

    coordinates = signal<[number, number]>([0, 0]);
    layerPaint = signal({
      'circle-radius': 10,
      'circle-color': '#3887be',
    });


    public setLocation(e: MapMouseEvent){
      console.log(e, MapMouseEvent)
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
    if(this.first_update_token){
      this.userService.createUser(this.first_update_token, this.form.getRawValue())
    } else {
      this.userService.updateUser(this.form.getRawValue())
    }
  }
  
}

