import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  templateUrl: 'auth0.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ]
})
export class AuthButtonComponent {
    
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
) {}
}