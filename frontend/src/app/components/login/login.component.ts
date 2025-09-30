import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthButtonComponent } from '../auth0/auth0.component';
import { AuthService } from '@auth0/auth0-angular';
import { MatProgressSpinner } from '@angular/material/progress-spinner'

const modulesToImport = [
  AuthButtonComponent,
  MatProgressSpinner
]

@Component({
    selector: 'app-login',
    imports: modulesToImport,
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true
})
export class LoginComponent{
  public loading: boolean = true;

  constructor(
    private router: Router,
    public authService: AuthService
  ){

  }

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe(x => {
      if(x){
        this.loading = true
        this.router.navigate(['layout'])
      } else {
        this.loading = false
      }
    })
  }
}
