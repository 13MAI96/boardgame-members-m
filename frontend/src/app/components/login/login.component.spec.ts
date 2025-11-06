import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of, Subject } from 'rxjs';
import { Auth0TestingModule } from '../../testing/auth0.testing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: jasmine.SpyObj<Router>
  let authService: AuthService
  let authMock$ = new Subject<boolean>()

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      imports: [LoginComponent, Auth0TestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
                isAuthenticated$: authMock$.asObservable(),
                user$: of({ name: 'Test User'}),
          },
        },
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should return undefined', ()=>{
    expect(component.ngOnInit()).toBeUndefined()
  })

  it('#loading should be true when user is Authenticated', () => {
    authMock$.next(true)
    expect(component.loading).toBeTrue()
  })
  it('#loading should be false when user is not Authenticated', () => {
    authMock$.next(false)
    expect(component.loading).toBeFalse()
  })

  it('#ngOnInit should navigate to layout if isAuthenticated is true', () => {
    authMock$.next(true)
    expect(router.navigate).toHaveBeenCalledWith(['layout'])
  })
});
