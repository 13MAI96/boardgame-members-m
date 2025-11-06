import { Component, DOCUMENT, inject, Inject, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { FullUser, User } from '../../models/user/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, AsyncPipe, CommonModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: true
})
export class LayoutComponent implements OnDestroy {
  public isSmallScreen: boolean = true;
  public isLandscapeScreen: boolean = false;
  private user!: FullUser;
  private auth: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  public userService: UserService = inject(UserService)
  private susbcriptions: Subscription[] = []


  constructor(
    @Inject(DOCUMENT) public document: Document,
    // private screenService: ScreenService,
  ) {}

  ngOnInit() {
    this.susbcriptions.push(
      this.auth.isAuthenticated$.subscribe(x => {
        if(!x){
          this.router.navigate(['login'])
        }
      }),
      this.userService.userData$.subscribe(x => this.user = x)
    )

  }

  ngOnDestroy(): void {
    this.susbcriptions.map(x => x.unsubscribe())
  }

  public logout(){
    this.auth.logout({
      logoutParams:{
        returnTo: this.document.location.origin,
        federated: true
      }
    })
  }

  public profile(){
    this.router.navigate(['layout/user'])
  }

  public goToMap(){
    this.router.navigate(['layout'])
  }
}
