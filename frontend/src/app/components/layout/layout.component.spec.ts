import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0TestingModule } from '../../testing/auth0.testing.module';
import { Router } from '@angular/router';
import { UserTestingService } from '@/app/testing/user.testing.module';
import { of, pipe, Subject } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authService: AuthService;
  let authMock$ = new Subject<boolean>()
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, Auth0TestingModule, UserTestingService],
      providers: [
        {
          provide: AuthService,
          useValue: {
                isAuthenticated$: authMock$.asObservable(),
                user$: of({ name: 'Test User'}),
                logout: () => {}
          },
        },
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#profile should return undefined', () => {
    expect(component.profile()).toBeUndefined()
  })

  it('#goToMap should return undefined', () => {
    expect(component.goToMap()).toBeUndefined()
  })

  it('#logout should return undefined', () => {
    expect(component.logout()).toBeUndefined()
  })

  it('#ngOnInit should return undefined', () => {
    expect(component.ngOnInit()).toBeUndefined()
  })

  it('#ngOnInit should navigate to login if isAuthenticated is false', () => {
    authMock$.next(false)
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login'])
  })

  afterEach(() => {
    component.ngOnDestroy();
    component['susbcriptions'].forEach(sub => expect(sub.closed).toBeTrue());
  });

});


  
  