import { Directive, HostListener, Input } from '@angular/core';
import { FALLBACK_IMAGE } from '@root/app.constants';

@Directive({
  selector: 'img[fallback]',
  standalone: true,
})
export class FallbackImageDirective {
  @Input() fallback = FALLBACK_IMAGE;

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.fallback) {
      img.src = this.fallback;
    }
  }
}
