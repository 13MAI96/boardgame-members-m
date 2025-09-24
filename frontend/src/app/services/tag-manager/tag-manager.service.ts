import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  pushEvent(event: any): void {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(event);
  }

  trackButtonClick(event_name: string, category: string, label: string): void {
    this.pushEvent({
      event: event_name,
      category: category,
      label: label,
    });
  }
}
