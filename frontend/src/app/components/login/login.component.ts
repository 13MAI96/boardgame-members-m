import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthButtonComponent } from '../auth0/auth0.component';
import { AuthService } from '@auth0/auth0-angular';

const modulesToImport = [
  FormsModule, 
  ReactiveFormsModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule,
  AuthButtonComponent
]

@Component({
    selector: 'app-login',
    imports: modulesToImport,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true
})
export class LoginComponent {
  public loginForm!: FormGroup
  readonly dialog = inject(MatDialog);

  constructor(
    private loginService: LoginService,
    private router: Router,
    public authService: AuthService
  ){
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(){
    this.authService.isAuthenticated$.subscribe(x => {
      if(x){
        this.router.navigate(['layout'])
      }
    })
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    // event.stopPropagation();
    event.preventDefault()
  }

  public loginOrSign(sign: boolean){
    if(this.loginForm.valid){
      let request: LoginRequest = this.loginForm.getRawValue()
      if(sign){
        this.loginService.registerUser(request).subscribe({next: response => {
          this.openDialog(response.message)
        }, error: (err: HttpErrorResponse) => {
          this.openDialog(err.message)
        }})
      } else {
        this.loginService.login(request).subscribe({next: response => {
          if(response.token){
            this.router.navigate(['layout'])
          }
        }, error: err => {
          this.openDialog(err.message)
        }
      })
      }
    }
  }

  openDialog(text: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
