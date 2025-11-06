import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { CluMapViewComponent } from './clu-map-view.component';
import { Auth0TestingModule } from '@/app/testing/auth0.testing.module';
import { UserTestingService } from '@/app/testing/user.testing.module';
import { UserService } from '@/app/services/user/user.service';

describe('Map View', () => {
  let component: CluMapViewComponent;
  let fixture: ComponentFixture<CluMapViewComponent>;
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CluMapViewComponent, Auth0TestingModule, UserTestingService],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CluMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = fixture.debugElement.injector.get(AuthService)
    userService = TestBed.inject(UserService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openMarkerPopUp should return undefined', () => {
    expect(component.openMarkerPopUp(userService.userData$.value)).toBeUndefined()
  })

  it('#getUserAlert should return a string', () => {
    expect(component.getUserAlert()).toBeInstanceOf(String)
  })

  it('#getStyleString should return a string', () => {
    expect(component.getStyleString("")).toBeInstanceOf(String)
  })

  it('#closeMarketPopUp should return undefined', ()=> {
    expect(component.closeMarkerPopUp()).toBeUndefined()
  })
});
