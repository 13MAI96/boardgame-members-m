import { Component, DOCUMENT, Inject } from '@angular/core';
import { ScreenService } from '../../services/screen/screen.service';
import { BreakpointState } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FullUser, User } from '../../models/user';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, AsyncPipe, CommonModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: true
})
export class LayoutComponent {
  public isSmallScreen: boolean = true;
  public isLandscapeScreen: boolean = false;
  private user!: FullUser;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private screenService: ScreenService,
    private auth: AuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.screenService.isSmallScreen().subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches
    });

    this.screenService.isLandscape().subscribe((state: BreakpointState) => {
      this.isLandscapeScreen = state.matches
    });

    this.auth.isAuthenticated$.subscribe(x => {
      if(!x){
        this.router.navigate(['login'])
      }
    })

    this.userService.userData.subscribe(x => x ? this.user = x : false)
  }

  logout(){
    this.auth.logout({
      logoutParams:{
        returnTo: this.document.location.origin,
        federated: true
      }
    })
  }

  profile(){
    this.router.navigate(['layout/user'])
  }

  goToMap(){
    this.router.navigate(['layout'])
  }
}
