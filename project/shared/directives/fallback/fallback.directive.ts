import { Directive, HostListener, Input } from '@angular/core';
import { FALLBACK_IMAGE } from '@root/app.constants';

@Directive({
  selector: 'img[appFallback]',
  standalone: true,
})
export class FallbackImageDirective {
  @Input() appFallback = FALLBACK_IMAGE;

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.appFallback) {
      img.src = this.appFallback;
    }
  }
}
