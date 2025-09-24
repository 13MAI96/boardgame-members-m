import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private breakpointObserver: BreakpointObserver) {}

  isSmallScreen() {
    return this.breakpointObserver.observe(['(max-width: 1279px)']);
  }

  isLandscape() {
    return this.breakpointObserver.observe(['(orientation: landscape)']);
  }
}
