import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallback]',
  standalone: true,
})
export class FallbackImageDirective {
  @Input() fallback = 'assets/placeholder-beer.png';

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.fallback) {
      img.src = this.fallback;
    }
  }
}
