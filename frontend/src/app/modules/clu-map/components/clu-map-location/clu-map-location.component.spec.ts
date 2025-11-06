import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0TestingModule } from '@/app/testing/auth0.testing.module';
import { UserTestingService } from '@/app/testing/user.testing.module';
import { UserService } from '@/app/services/user/user.service';
import { CluMapLocationComponent } from './clu-map-location.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing'
import { MapMouseEvent } from 'mapbox-gl';
import { toArray } from 'rxjs';

describe('Map View', () => {
  let component: CluMapLocationComponent;
  let fixture: ComponentFixture<CluMapLocationComponent>;
  let authService: AuthService
  let userService: UserService
  let activatedRoute: ActivatedRoute

  beforeEach(async () => {
    let harness: RouterTestingHarness


    await TestBed.configureTestingModule({
      imports: [
        CluMapLocationComponent, 
        Auth0TestingModule, 
        UserTestingService
      ],
      providers: [
        provideRouter([])
      ]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CluMapLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = fixture.debugElement.injector.get(AuthService)
    userService = TestBed.inject(UserService)

    harness = await RouterTestingHarness.create()
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setLocation should update form values', () => {
     let mapMouseEvent =  jasmine.createSpyObj('MapMouseEvent',[], {lngLat: {lng: 1, lat: 1, toArray: () => [0, 0]}})
    component.setLocation(mapMouseEvent)
    expect(component.form.controls['lng'].value).toBe(1)
    expect(component.form.controls['lat'].value).toBe(1)
  })

  it('#getStyleString should return a string', () => {
    expect(component.getStyleString("")).toBeInstanceOf(String)
  })

  it('#updateUser should return undefined', ()=> {
    expect(component.updateUser()).toBeUndefined()
  })

  // it('#')
  
});
