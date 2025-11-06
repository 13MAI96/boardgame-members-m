import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@auth0/auth0-angular';

import { Auth0TestingModule } from '../../testing/auth0.testing.module';
import { AuthButtonComponent } from './auth0.component';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButtonComponent, Auth0TestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = fixture.debugElement.injector.get(AuthService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
